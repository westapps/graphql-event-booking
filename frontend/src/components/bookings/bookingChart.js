import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import {cheap, medium, expensive} from '../../constant';

import './bookingChart.css';


class BookingChart extends Component {
  constructor(props){
    super(props);
    this.state = {
      cheapCount: 0,
      mediumCount: 0,
      expensiveCount: 0,
      bookings: this.props.bookings,
    };
    

  }

  bookingCount() {
    let cheapCount = 0,
        mediumCount = 0,
        expensiveCount = 0;


    this.state.bookings.forEach(booking => {
      if(+booking.event.price <= +cheap.max && +booking.event.price >= +cheap.min){
        cheapCount++;
        this.setState(prevState => {
          return {
            ...prevState,
            cheapCount: cheapCount
          }
        });
      }else if(+booking.event.price <= +medium.max && +booking.event.price > +medium.min){
        mediumCount++;
        this.setState(prevState => {
          return {
            ...prevState,
            mediumCount: mediumCount
          }
        });
      }else if(+booking.event.price > +expensive.min){
        expensiveCount++;
        this.setState(prevState => {
          return {
            ...prevState,
            expensiveCount: expensiveCount
          }
        });
      }else{
        throw new Error('price out of range');
      }
      //return;
    });
  }

  componentDidMount(){
    this.bookingCount();
  };

  render() {

    const options = {
      chart: {
          type: 'pie'
        },
        title: {
          text: 'Booking Price Distribution'
        },
        series: [{
        colorByPoint: true,
        data: [{
          name: 'cheapCount',
          y: this.state.cheapCount,
          color: '#3498db',
          sliced: true,
          selected: true
        }, {
          name: 'mediumCount',
          y: this.state.mediumCount,
          color: '#9b59b6'
        }, {
          name: 'expensiveCount',
          y: this.state.expensiveCount,
          color: '#2ecc71'
        }]
      }]
    }

    return (
        <div>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    )
  }
}

export default BookingChart;
