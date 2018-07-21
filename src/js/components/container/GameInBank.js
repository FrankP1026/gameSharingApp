import React, { Component } from "react";
import '../../../scss/components/gameInBank.scss';


class GameInBank extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    let gamesListUrl = "/api/games";

    fetch(gamesListUrl)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  borrowGame(e) {
    console.log('borrowing Mario Odyssy')
    e.preventDefault();
  }

  render() {
    const { error, isLoaded, items } = this.state;
    
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul className="">
          {items.map(item => (
            <li key={item.id} className="gameInBank-item">
              <h5>{ item.name }</h5>
              <p>1 copy, 1 taken, 12 people waiting</p>
              <p>Description</p>
              <a onClick={(e)=>this.borrowGame(e)}>I want to borrow it!</a>
              <a href="#todo">Go to Eshop</a>
            </li>
          ))}
        </ul>
      );
    }

  }
}

export default GameInBank;