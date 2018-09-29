import React, { Component } from 'react';

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

    fetch("http://localhost:8080/api/token-auth/", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username_or_email: this.state.username_or_email,
        password: this.state.password
      })
    })
      .then(res => this.handleErrors(res))
      .then(res => res.json())
      .then(
        (result) => {
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
    return (
      <div className='form-Container'>
        <form>
          <div className="form-group">
            <input type="text" name="user_name" placeholder="User name or Email address" onChange={this.updateUserName.bind(this)}/>
          </div>
          <div className="form-group">
            <input type="text" name="password" placeholder="password" onChange={this.updatePassword.bind(this)}/>
          </div>
            <p><small className='text-error'> {this.state.error ? this.state.error : ""} </small></p>

          <input type="submit" value="Log In" onClick={this.logIn.bind(this)}/>
        </form>
      </div>
    );
  }
}

export default LogInForm;
