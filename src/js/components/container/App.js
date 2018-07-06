import React, { Component } from "react";
import ReactDOM from "react-dom";
import '../../../scss/general/general.scss';

import AddGameForm from "./AddGameForm";
import Header from "../presentational/Header";
import GameInBank from "../container/GameInBank";


class App extends Component {
  constructor() {
    super();
    this.state = {
      testState: ""
    };
  }

  render() {
    return (
      <div className="container">
        <Header />
        <AddGameForm />
        <GameInBank />
      </div>
    );
  }
}

export default App;

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : false;