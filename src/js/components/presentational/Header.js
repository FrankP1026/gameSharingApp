import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import '../../../scss/components/header.scss';
import logo from '../../../img/logo.svg'

// function logOut(e){
//   e.preventDefault();
//   console.log('logout')
// }
const LoggedInMenu = (props) => {
  // console.log('e',e.logOutHandler)
  return(
    <ul className="float-right nav">
      <li className="nav-item"><Link to="#" data-modal="about-us">How does it work?</Link></li>
      <li className="nav-item"><Link to="/my-account/">My stuff </Link></li>
      <li className="nav-item"><Link to="#" onClick={props.logOutHandler}>Log Out</Link></li>
    </ul>
  )
}

const DefaultMenu = () => {
  return(
    <ul className="float-right nav">
      <li className="nav-item"><Link to="#" data-modal="about-us">How does it work?</Link></li>
      <li className="nav-item"><Link to="/login">Log In </Link></li>
    </ul>
  )
}


const Header = (props) => {
  return (
    <header className="header">
    	<div className="container">
        <Link to="/" className="app-logo">
          <img src={logo} alt="logo"/>
        </Link>
             
        <span>Hi <span>{ props.loggedIn  ? props.userId : 'there'}</span>, Share your game!</span>

        {
          props.loggedIn ? 
            <LoggedInMenu logOutHandler={props.logOutHandler}/> 
            : <DefaultMenu />
        }
              
      </div>
    </header>
  )
};


export default Header;