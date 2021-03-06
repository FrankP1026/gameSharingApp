import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';

class LogInForm extends Component {
  constructor() {
    super();
    this.state = {

      username_or_email: null,
      password: null,
      error: null,
      isLoaded: false,
      token: null
    };
  }

  handleErrors(response) {
    if (!response.ok) {
      this.setState({
        isLoaded: true,
        error: response.status
      });
      throw response.status
    }
    return response;
  }

  logIn(e){
    e.preventDefault();
    const userNameOrEmail = this.state.username_or_email;
    const password = this.state.password;

    fetch("http://localhost:8080/api/token-auth/", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username_or_email: userNameOrEmail,
        password: password
      })
    })
      // Need to handle 404/500 separately with fetch 
      // Ref: https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
      .then(res => this.handleErrors(res))
      .then(res => res.json())
      .then(
        (result) => {
          // logged-in props needs to be updated as a global state! 
          this.props.logInHandler(userNameOrEmail);
          this.setState({
            isLoaded: true,
            token: result.token
          });
        }
      )
      .catch(e => {
        this.setState({
          isLoaded: true,
          error: e
        });
      })
  }

  updateUserName(e){
    this.setState({
      username_or_email: e.target.value
    });
  }

  updatePassword(e){
    this.setState({
      password: e.target.value
    });
  }

  render() {
    const { error, isLoaded } = this.state;
    if(this.props.isLoggedIn){
      return (
        <div className='form-Container'>
          <p>Success! click <Link to="/">here</Link> to go back home...</p>
        </div>
      )
    } else {
      return (
        <div className='form-Container'>
          <form>
            <div className="form-group">
              <input type="text" name="user_name" placeholder="User name or Email address" onChange={this.updateUserName.bind(this)}/>
            </div>
            <div className="form-group">
              <input type="password" name="password" placeholder="password" onChange={this.updatePassword.bind(this)}/>
            </div>

            { this.state.error ? 
              <p><small className='text-error'> { this.state.error } </small></p> : ""
            }

            <input type="submit" value="Log In" onClick={this.logIn.bind(this)}/>
          </form>
        </div>
      );
    }
  }
}

export default LogInForm;
