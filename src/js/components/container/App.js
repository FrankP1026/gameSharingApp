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

const App = () => (
  <Router>
    <div className='app-container'>

      <Header />

      <Route exact path="/" component={Home}/>
      <Route path="/login" component={LogInForm}/>

    </div>
  </Router>
)



class Home extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn : false,
      userName : ''
    };
  }

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
