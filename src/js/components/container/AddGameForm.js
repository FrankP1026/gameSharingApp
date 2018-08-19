import React, { Component } from 'react';
import '../../../scss/components/form.scss';


class AddGameForm extends Component {
  constructor() {
    super();
    this.state = {
      gameName: '',
    };
  }

  updateGameName(e) {
    this.setState({ gameName: e.target.value });
  }

  addGame(e) {
    console.log('adding game', this.state.gameName);
    e.preventDefault();
  }

  render() {
    return (
      <div className="form-Container">
        <h5>
          Have a game to share? Add a game
        </h5>
            <form action="/">
              <div className="form-group">
  	      			<p>Game name:</p>
  		  				<input type="text" name="game-name" onChange={(e)=>this.updateGameName(e)}/>
		  			  </div>
		  			<input type="submit" value="Add" onClick={(e)=>this.addGame(e)}/>
	     	</form>
      </div>
    );
  }

}

export default AddGameForm;