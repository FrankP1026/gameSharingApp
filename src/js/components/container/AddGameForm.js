import React, { Component } from 'react';
import '../../../scss/components/form.scss';


class AddGameForm extends Component {
  constructor() {
    super();
    this.state = {
      gameName: '',
      error: null
    };
  }

  updateGameName(e) {
    this.setState({ gameName: e.target.value });
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

  addGame(e) {
    const gameName = this.state.gameName;
    document.getElementById('add-game-form').reset();

    e.preventDefault();
    fetch("http://localhost:8080/api/games/", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: gameName
      })
    })
      // Need to handle 404/500 separately with fetch 
      // Ref: https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
      .then(res => this.handleErrors(res))
      .then(res => res.json())
      .then(
        (result) => {
          this.props.printAddedGame(result);
        }
      )
      .catch(e => {
        this.setState({
          error: e
        });
      })
  }

  render() {
    return (
      <div className="form-Container">
        <h5>
          Have a game to share? Add a game
        </h5>
            <form action="/"  id="add-game-form">
              <div className="form-group">
  	      			<p>Game name:</p>
  		  				<input type="text" name="game-name" onChange={(e)=>this.updateGameName(e)}/>
		  			  </div>
              { this.state.error ? 
                <p><small className='text-error'> { this.state.error } </small></p> : ""
              }
		  			<input type="submit" value="Add" onClick={(e)=>this.addGame(e)}/>
	     	</form>
      </div>
    );
  }

}

export default AddGameForm;