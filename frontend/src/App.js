import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import ViewError from "./views/error";
import AuthPage from "./components/Auth";
import EventsPage from "./components/eventsPage";
import BookingsPage from "./components/bookingsPage";


import './App.css';

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Redirect from='/' to='/auth' exact />
          <Route exact={true} path='/auth' component={AuthPage}/>
          <Route exact={true} path='/events' component={EventsPage}/>
          <Route exact={true} path='/bookings' component={BookingsPage}/>
          <Route component={ViewError} />
        </Switch>
      </BrowserRouter>
    );
  }

}

export default App;
