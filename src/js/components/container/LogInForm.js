import React, { Component } from 'react';

class LogInForm extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn : false,
      userName : ''
    };
  }

  logIn(e){
    e.preventDefault();
    console.log('log in')
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

export default LogInForm;
