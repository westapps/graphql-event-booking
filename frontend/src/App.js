import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import ErrorPage from "./views/errorPage";
import AuthPage from "./views/authPage";
import EventsPage from "./views/eventsPage";
import BookingsPage from "./views/bookingsPage";
import MainNavigation from './components/navigation/mainNavigation';


import './App.css';

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <React.Fragment>
          <MainNavigation />
            <main className="main-content">
              <Switch>
                <Redirect from='/' to='/auth' exact />
                <Route exact={true} path='/auth' component={AuthPage}/>
                <Route exact={true} path='/events' component={EventsPage}/>
                <Route exact={true} path='/bookings' component={BookingsPage}/>
                <Route component={ErrorPage} />
              </Switch>
            </main>
        </React.Fragment>
      </BrowserRouter>
    );
  }

}

export default App;
