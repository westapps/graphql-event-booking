'use strict';

const bcrypt = require('bcryptjs');
const User = require('../../models/user');
const Booking = require('../../models/booking');
const Event = require('../../models/event');
const { dateToString } = require('../../helpers/date');
const { events, singleEvent, user } = require('./util');

module.exports = {
  createUser: async (args) => {
    try {
      let existingCreator = await User.findOne({email: args.userInput.email});
      if(existingCreator){
        throw new Error('user exists already.');
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      const creator = new User({
        email: args.userInput.email,
        password: hashedPassword
      });
      const userSaveResult = await creator.save();
      return {...userSaveResult._doc, password: null, _id: userSaveResult.id};
    }catch(err){
      throw err;
    }
  }
}
