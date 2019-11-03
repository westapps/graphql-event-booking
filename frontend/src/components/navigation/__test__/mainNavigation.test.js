import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AuthContext from '../../../context/authContext';
import MainNavigation from '../mainNavigation.js';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('test component MainNavigation', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <MainNavigation/>
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });


  it('renders MainNavigation correctlly with context.token', () => {
    const { getByTestId } = render(
          <BrowserRouter>
            <React.Fragment>
              <AuthContext.Provider
                value={{
                  token: "sfsr5436",
                  userId: "0099876",
                  login: () => {},
                  logout: () => {}
                }}
              >
                <MainNavigation />
              </AuthContext.Provider>
            </React.Fragment>
          </BrowserRouter>,
    );
    expect(getByTestId('MainNavigation')).toHaveTextContent('xEvent');
    expect(getByTestId('MainNavigation')).toHaveTextContent('Events');
    expect(getByTestId('MainNavigation')).toHaveTextContent('Bookings');
    expect(getByTestId('MainNavigation')).toHaveTextContent('Logout');
  });

  it('renders MainNavigation correctlly without context.token', () => {
    const { getByTestId } = render(
          <BrowserRouter>
            <React.Fragment>
              <AuthContext.Provider
                value={{
                  token: "",
                  userId: "0099876",
                  login: () => {},
                  logout: () => {}
                }}
              >
                <MainNavigation />
              </AuthContext.Provider>
            </React.Fragment>
          </BrowserRouter>,
    );
    expect(getByTestId('MainNavigation')).toHaveTextContent('xEvent');
    expect(getByTestId('MainNavigation')).toHaveTextContent('Events');
    expect(getByTestId('MainNavigation')).toHaveTextContent('Login | Signup');
  });

})
