'use strict';

const Event = require('../../models/event');
const { dateToString } = require('../../helpers/date');
const { events, singleEvent, user } = require('./util');

const transformEvent = event => {
  return {
    ...event._doc,
    _id: event.id,
    date: dateToString(event._doc.date),
    creator: user.bind(this, event.creator)
  };
};

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(event => {
        console.log('events:', event._doc);
        return transformEvent(event);
      });
    }catch(err){
      throw err; // express will catch this err and pass down to error handler
    }
  },
  createEvent: async (args) => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: dateToString(args.eventInput.date),
      creator: '5d8641449ee9a92fbc53ef75'
    });
    let createdEvent;
    try {
      const result = await event.save();
      console.log('createEvent:', result._doc);
      createdEvent = transformEvent(result);
      console.log('event.save(): ', result);
      const creator = await User.findById('5d8641449ee9a92fbc53ef75');
      if(!creator){
        throw new Error('user not found');
      }
      creator.createdEvents.push(event);
      await creator.save();
      return createdEvent;
    }catch(err){
      console.log(err);
      throw err;
    }
  }
};
