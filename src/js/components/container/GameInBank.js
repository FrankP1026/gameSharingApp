import React, { Component } from "react";
import '../../../scss/components/gameInBank.scss';


class GameInBank extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      existedItems: []
    };
  }

  componentDidMount() {
    let gamesListUrl = "/api/games";

    fetch(gamesListUrl)
      .then(res => res.json())
      .then(
        (result) => {

          this.setState({
            isLoaded: true,
            existedItems: result.reverse()
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

  borrowGame(e,gameName) {
    console.log(gameName)
    e.preventDefault();
  }

  render() {
    const { error, isLoaded, existedItems } = this.state;
    const addedGames = this.props.userAddedGame; 
    let printItems;
    if(addedGames !== null){
      printItems = addedGames.concat(existedItems);
    } else {
      printItems = existedItems;
    }

    
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="container">
          <p className="text-center">Here is the game that's available at the moment</p>
          <ul className="gameInBank-container">
            {printItems.map(item => (
              <li key={item.id} className="gameInBank-item">
                <h5>{ item.name }</h5>
                <p>1 copy, 1 taken, 12 people waiting</p>
                <p>Description</p>
                <a href="#todo" onClick={(e)=>this.borrowGame(e,item.name)}>I want to borrow it!</a>
                <a href="#todo" className="float-right">Go to Eshop</a>
              </li>
            ))}
          </ul>
        </div>
      );
    }

  }
}

export default GameInBank;