import React from 'react';
import { NavLink } from 'react-router-dom';

import AuthContext from '../../context/authContext';

import './mainNavigation.css';

const MainNavigation = props => (
  <AuthContext.Consumer >
    {context => {
      return (
        <header data-testid="MainNavigation" className="main-navigation">
          <div className="main-navigation__logo">
            <h1>xEvent</h1>
          </div>
          <nav className="main-navigation__items">
            <ul>
              <li>
                <NavLink to="/events">Events</NavLink>
              </li>
              {context.token && (
                <React.Fragment>
                  <li>
                    <NavLink to="/bookings">Bookings</NavLink>
                  </li>
                  <li>
                    <button onClick={context.logout}>Logout</button>
                  </li>
                </React.Fragment>
              )}
              {!context.token && (
                <li>
                  <NavLink to="/auth">Login | Signup</NavLink>
                </li>
              )}

            </ul>
          </nav>
        </header>
      );
    }}
  </AuthContext.Consumer>
);




export default MainNavigation;
