import React, { Component } from "react";
import ReactDOM from "react-dom";
import '../../../scss/components/gameInBank.scss';


class GameInBank extends Component {
  constructor() {
    super();
    this.state = {
      gameName: ""
    };
  }

  borrowGame(e) {
    console.log('borrowing Mario Odyssy')
    e.preventDefault();
  }

  render() {
    return (
    	<div className="gameInBank-item">
    		<h5>Mario Odyssy</h5>
        <p>1 copy, 1 taken, 12 people waiting</p>
        <p>Description</p>
        <a onClick={(e)=>this.borrowGame(e)}>I want to borrow it!</a>
        <a href="#todo">Go to Eshop</a>
      </div>
    );
  }
}

export default GameInBank;