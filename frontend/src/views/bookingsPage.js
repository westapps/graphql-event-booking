import React, { Component } from 'react';
import AuthContext from '../context/authContext';
import Spinner from '../components/spinner/spinner';

import './bookings.css';

class BookingsPage extends Component {
  state = {
    isLoading: false,
    bookings: []
  }

  static contextType = AuthContext;

  componentDidMount(){
    this.fetchBookings();
  }

  fetchBookings = () => {
    this.setState({isLoading: true});

    let requestBody = {
        query: `
          query {
            bookings {
              _id
              createdAt
              event {
                _id
                title
                date
              }
            }
          }
        `
      };


    fetch('http://localhost:3008/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.context.token
        }
    })
    .then(res => {
      if(res.status !== 200 && res.status !== 201 ){
        throw new Error('failed');
      }
      return res.json();
    })
    .then(resData => {
      console.log(resData);
      const bookings = resData.data.bookings;
      this.setState({bookings: bookings, isLoading: false});
      console.log(this.state.bookings);
    })
    .catch(err => {
      console.log(err);
      this.setState({isLoading: false});
    })
  }

  render(){
    const bookingList = this.state.bookings.map(booking => {
      return (
        <li key={booking._id}>
          {booking.event.title} - {new Date(booking.createdAt).toLocaleDateString()}
        </li>
      );
    });

    return (
      <React.Fragment>
        {this.state.isLoading ? <Spinner /> :
          (<ul>
            {bookingList}
          </ul>)
        }
      </React.Fragment>
    );
  }
};

export default BookingsPage;
