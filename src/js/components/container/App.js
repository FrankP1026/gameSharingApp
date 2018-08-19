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
      loggedIn : true,
      userId : 'coral'
    };
  }

  logOutHandler(e){
    e.preventDefault();
    console.log('this',this)
    this.setState((prevState)=>{
      if (prevState.loggedIn){
        return { loggedIn: !prevState.loggedIn}
      } else return null;
    })
  } 

  render(){
    var logOutHandler = this.logOutHandler;

    return (
      <Router>
        <div className='app-container'>

          <Header {...this.state} logOutHandler = {this.logOutHandler} />

          <Route exact path="/" component={Home}/>
          <Route path="/login" component={LogInForm}/>

        </div>
      </Router>
      )
  }
} 


class Home extends Component {

  render() {
    return (
      <div>
        <AddGameForm />
        <GameInBank />
      </div>
    );
  }
}


export default App;
