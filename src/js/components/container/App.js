import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import '../../../scss/general/general.scss';


import AddGameForm from './AddGameForm';
import LogInForm from './LogInForm';
import MyStuff from './MyStuff';
import Header from '../presentational/Header';
import GameInBank from '../container/GameInBank';

class App extends Component{
  constructor() {
    super();
    this.logOutHandler = this.logOutHandler.bind(this);
    this.state = {
      isLoggedIn : false,
      userId : null,
      userToken: null,
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

  logInHandler(userNameOrEmail,userToken) {
    console.log("Logged in!!", 'this',this)
    this.setState((prevState)=>{
      if (!prevState.loggedIn){
        return { 
          isLoggedIn: !prevState.isLoggedIn ,
          userId: userNameOrEmail,
          userToken: userToken
        }
      } else return null;
    })
  }

  printAddedGame(addedGame){
    this.setState((prevState)=>{

      if(prevState.userAddedGame){
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
            render={() => <LogInForm 
              logInHandler = {this.logInHandler.bind(this)}/>}
              {...this.state} 
          />
          <Route 
            path="/my-account" 
            render={() => <MyStuff 
              logInHandler = {this.logInHandler.bind(this)}/>}
              {...this.state} 
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
