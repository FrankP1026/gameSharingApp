import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import '../../../scss/components/header.scss';
import logo from '../../../img/logo.svg'


const LoggedInMenu = (props) => {
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
             
        <span>Hi <span>{ props.isLoggedIn  ? props.userId : 'there'}</span>!</span>

        {
          props.isLoggedIn ? 
            <LoggedInMenu logOutHandler={props.logOutHandler}/> 
            : <DefaultMenu />
        }
              
      </div>
    </header>
  )
};


export default Header;