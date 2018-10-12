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

  updateGames(game){
    console.log('adding game! Full list:', games)
    // TODO: Update state only to trigger re-render with the added game. 
  }

  render(){
    const logOutHandler = this.logOutHandler;

    return (
      <Router>
        <div className='app-container'>

          <Header {...this.state} logOutHandler = {this.logOutHandler} />

          <Route exact 
            path="/" 
            render = { () => <Home updateGames = {this.updateGames.bind(this)}/> }
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
        <AddGameForm updateGames = {this.props.updateGames}/>
        <GameInBank />
      </div>
    );
  }
}


export default App;
