import React from "react";
import PropTypes from "prop-types";
import '../../../scss/components/header.scss';
import logo from '../../../img/logo.svg'


const Header = () => {
	return (
  <header className="header">
  	<div className="container">
      <a href="/" className="app-logo">
        <img src={logo} alt="logo"/>
        {/*<object type="image/svg+xml" data={logo} />*/}
      </a>
      <span >Hi <span>User</span>, Share your game! </span>
      <ul className="float-right nav">
            <li className="nav-item"><a href="#" data-modal="aboutus">How does it work?</a></li>
            {/*<li className="nav-item"><a href="/my-stuff">My stuff </a></li>*/}
            {/*<li className="nav-item"><a href="/my-account">My account </a></li>*/}
            <li className="nav-item"><a href="/login">Log in </a></li>
      </ul>
    </div>
  </header>
  )
};

Header.propTypes = {

};

export default Header;