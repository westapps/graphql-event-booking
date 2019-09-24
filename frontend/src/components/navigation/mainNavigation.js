import React from 'react';
import { NavLink } from 'react-router-dom';

import './mainNavigation.css';

const MainNavigation = props => {
  return (
    <header className="main-navigation">
      <div className="main-navigation__logo">
        <h1>xEvent</h1>
      </div>
      <nav className="main-navigation__items">
        <ul>
          <li><NavLink to="/events">Events</NavLink></li>
          <li><NavLink to="/bookings">Bookings</NavLink></li>
          <li><NavLink to="/auth">Sign Up | Login</NavLink></li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
