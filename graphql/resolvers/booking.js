'use strict';

const User = require('../../models/user');
const Booking = require('../../models/booking');
const Event = require('../../models/event');
const { dateToString } = require('../../helpers/date');
const { transformBooking, transformEvent, events, singleEvent, user } = require('./util');


module.exports = {
  bookings: async () => {
    try {
      const bookings = await Booking.find();
      return bookings.map(booking => {
        return transformBooking(booking);
      });
    } catch(err){
      throw err;
    }
  },
  bookEvent: async (args) => {
    const fetchedEvent = await Event.findOne({_id: args.eventId});
    const booking = new Booking({
      user: '5d8641449ee9a92fbc53ef75',
      event: fetchedEvent
    });
    const result = await booking.save();
    return transformBooking(result);
  },
  cancelBooking: async args => {
    try{
      const booking = await Booking.findById(args.bookingId).populate('event');
      const event = transformEvent(booking.event);
      await Booking.deleteOne({_id: args.bookingId});
      return event;
    }catch(err){
      throw err;
    }
  }
};
