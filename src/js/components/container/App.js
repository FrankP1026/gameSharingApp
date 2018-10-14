import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import '../../../scss/general/general.scss';


import AddGameForm from './AddGameForm';
import LogInForm from './LogInForm';
import Header from '../presentational/Header';
import GameInBank from '../container/GameInBank';

class App extends Component{
  constructor() {
    super();
    this.logOutHandler = this.logOutHandler.bind(this);
    this.state = {
      isLoggedIn : false,
      userId : null,
      userAddedGame: null
    };
  }

  logOutHandler(e){
    e.preventDefault();
    console.log('this',this)
    this.setState((prevState)=>{
      if (prevState.isLoggedIn){
        return { 
          isLoggedIn: !prevState.isLoggedIn,
          userId: null
        }
      } else return null;
    })
  } 

  logInHandler(userNameOrEmail) {
    console.log('this',this)
    this.setState((prevState)=>{
      if (!prevState.loggedIn){
        return { 
          isLoggedIn: !prevState.isLoggedIn ,
          userId: userNameOrEmail
        }
      } else return null;
    })
  }

  printAddedGame(addedGame){
    this.setState((prevState)=>{
      if(prevState.userAddedGame !== null){
        return {
          userAddedGame: [addedGame, ...prevState.userAddedGame ]
        }
      } else {
        return {
          userAddedGame : [addedGame]
        }
      }
    })
  }

  render(){
    const logOutHandler = this.logOutHandler;

    return (
      <Router>
        <div className='app-container'>

          <Header {...this.state} logOutHandler = {this.logOutHandler} />

          <Route exact 
            path="/" 
            render = { () => <Home 
              printAddedGame = {this.printAddedGame.bind(this)} 
              userAddedGame = {this.state.userAddedGame}
              /> 
            }
          />
          <Route 
            path="/login" 
            render={() => <LogInForm {...this.state} logInHandler = {this.logInHandler.bind(this)}/>}
          />

        </div>
      </Router>
      )
  }
} 


class Home extends Component {

  render() {
    return (
      <div>
        <AddGameForm 
          printAddedGame = {this.props.printAddedGame}
        />
        <GameInBank 
          userAddedGame = {this.props.userAddedGame}
        />
      </div>
    );
  }
}


export default App;
