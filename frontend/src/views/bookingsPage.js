import React, { Component } from 'react';
import AuthContext from '../context/authContext';
import Spinner from '../components/spinner/spinner';
import BookingList from '../components/bookings/bookingList';
import BookingChart from '../components/bookings/bookingChart';


import './bookings.css';

class BookingsPage extends Component {
  state = {
    isLoading: false,
    bookings: [],
    bookingTab: 'list'
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
                price
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

  onDeleteHandler = (bookingId) => {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          mutation CancelBooking($id: ID!) {
            cancelBooking(bookingId: $id) {
            _id
             title
            }
          }
        `,
      variables: {
        id: bookingId
      }
    };

    fetch('http://localhost:3008/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.context.token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        this.setState(prevState => {
          const updatedBookings = prevState.bookings.filter(booking => {
            console.log(booking._id, ': ',bookingId);
            return booking._id !== bookingId;
          });
          return { bookings: updatedBookings, isLoading: false };
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  }

  onChangeTab = (message) => {

    switch(message){
      case 'list':
        this.setState((prevState) => {
          return {
            ...this.prevState,
            bookingTab: 'list'
          };
        });
        break;
      case 'chart':
      this.setState((prevState) => {
        return {
          ...this.prevState,
          bookingTab: 'chart'
        };
      });
      break;
      default:
        return this.setState((prevState) => {
          return {
            ...prevState,
            bookingTab: 'list'
          };
        });
    }
  }

  render(){
    let content = <Spinner />;
    if(this.state.isLoading === false) {
      return content = (
        <div className="bookings-page">
          <div className="bookings-tab">
            <button
              className="btn"
              className={this.state.bookingTab === 'list' ? 'active' : ''}
              onClick={() => this.onChangeTab('list')}
            >List
            </button>
            <button
              className="btn"
              className={this.state.bookingTab === 'chart' ? 'active' : ''}
              onClick={() => this.onChangeTab('chart')}
            >Chart
            </button>
          </div>
          {this.state.bookingTab === 'list' && <BookingList bookings={this.state.bookings} onDelete={this.onDeleteHandler} />}
          {this.state.bookingTab === 'chart' && <BookingChart bookings={this.state.bookings} />}
        </div>
      );
    };

    return (
        <React.Fragment>
          {content}
        </React.Fragment>
    );
  }
};

export default BookingsPage;
