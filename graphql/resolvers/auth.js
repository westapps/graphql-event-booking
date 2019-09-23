'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
  },
  login: async ({ email, password }) => {
    const loginUser = await User.findOne({ email: email});
    if(!loginUser){
      throw new Error('invalid credentials');
    }
    const isEqual = await bcrypt.compare(password, loginUser.password);
    if(!isEqual){
      throw new Error('invalid credentials');
    }
    const token = jwt.sign(
      {
        userId: loginUser.id, email: loginUser.email
      },
      'SuperSecretSignatureKey887%^$#@!',
      {
        expiresIn: '2h'
      }
    );
    return {userId: loginUser.id, token: token, tokenExpiration: 2};
  }
}
