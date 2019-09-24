import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import ErrorPage from "./views/errorPage";
import AuthPage from "./views/authPage";
import EventsPage from "./views/eventsPage";
import BookingsPage from "./views/bookingsPage";
import MainNavigation from './components/navigation/mainNavigation';
import AuthContext from './context/authContext';


import './App.css';

class App extends Component {

  state = {
    token: null,
    userId: null
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({token: token, userId: userId});
  };

  logout = () => {
    this.setState({token: null, userId: null});
  };


  render(){
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider
            value={{
              token: this.state.token,
              userId: this.state.userId,
              login: this.login,
              logout: this.logout
            }}
          >
            <MainNavigation />
              <main className="main-content">
                <Switch>
                  {this.state.token && (<Redirect from="/" to='/events' exact />)}
                  {this.state.token && (<Redirect from="/auth" to='/events' exact />)}
                  {!this.state.token && (<Route exact={true} path='/auth' component={AuthPage}/>)}
                  <Route exact={true} path='/events' component={EventsPage}/>
                  {this.state.token && (<Route exact={true} path='/bookings' component={BookingsPage}/>)}
                  {!this.state.token && (<Redirect to='/auth' exact />)}                  
                </Switch>
              </main>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }

}

export default App;
