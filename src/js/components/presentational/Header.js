import React from "react";
import PropTypes from "prop-types";
import '../../../scss/components/header.scss';


console.log('hell yea from header')
const Header = () => {
	return (
  <header className="header">
  	<span >Hi <span>User</span>, Share your game! </span>
  	<ul className="float-right nav">
	  	<li className="nav-item"><a href="/my-stuff">My stuff </a></li>
	  	<li className="nav-item"><a href="/my-account">My account </a></li>
	  	<li className="nav-item"><a href="/log-out">Log out </a></li>
  	</ul>
  </header>
  )
};

Header.propTypes = {

};

export default Header;