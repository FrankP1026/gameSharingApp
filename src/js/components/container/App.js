import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import '../../../scss/general/general.scss';

import AddGameForm from './AddGameForm';
import Header from '../presentational/Header';
import GameInBank from '../container/GameInBank';


const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.path}/:topicId`} component={Topic}/>
    <Route exact path={match.path} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)



const App = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/topics">Topics</Link></li>

      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/login" component={Login}/>
      <Route path="/topics" component={Topics}/>


    </div>
  </Router>
)
export default App



class Login extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn : false,
      userName : ''
    };
  }

  logIn(e){
    cosole.log('log in')
  }

  render() {
    return (
      <div className='form-Container'>
        <form>
          <div className="form-group">
            <input type="text" name="user_name" placeholder="User name or Email address"/>
          </div>
          <div className="form-group">
            <input type="text" name="password" placeholder="password" />
          </div>

          <input type="submit" value="Log In" onClick={(e)=>this.logIn(e)}/>
        </form>
      </div>
    );
  }
}

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
      <div className='app-container'>
        <Header />
        <AddGameForm />
        <GameInBank />
      </div>
    );
  }
}

// export default App;
