import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import '../../../scss/components/header.scss';
import logo from '../../../img/logo.svg'


const Header = () => {
	return (
  <header className="header">
  	<div className="container">
      <Link to="/" className="app-logo">
        <img src={logo} alt="logo"/>
      </Link>

      <span >Hi <span>User</span>, Share your game! </span>
      <ul className="float-right nav">
            <li className="nav-item"><Link to="#" data-modal="aboutus">How does it work?</Link></li>
            {/*<li className="nav-item"><Link to="/my-stuff">My stuff </Link></li>*/}
            {/*<li className="nav-item"><Link to="/my-account">My account </Link></li>*/}
            <li className="nav-item"><Link to="/login">Log in </Link></li>
      </ul>
    </div>
  </header>
  )
};


export default Header;