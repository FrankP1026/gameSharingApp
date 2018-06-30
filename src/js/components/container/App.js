import React, { Component } from "react";
import ReactDOM from "react-dom";
import '../../../scss/file.scss';

import Input from "../presentational/Input";

class App extends Component {
  constructor() {
    super();
    this.state = {
      testState: ""
    };
  }

  render() {
    return (
      <div className="app">Hello!!!
        <Input/>
      </div>
    );
  }
}

export default App;

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : false;