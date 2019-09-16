'use strict';

const mongoose = require('mongoose');

const mongodb_options = {
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
  keepAlive: true,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

//import mongoose connection config
// const config = require("../config/config.js");

const mongodbConnection = () => {
      let uri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URI}`;
      mongoose.connect(uri, mongodb_options);
      // Get Mongoose to use the global promise library
      mongoose.Promise = global.Promise;
      const db = mongoose.connection;
      // get notification of connection status
      db.on('connecting', function() {
        console.log('connecting to MongoDB...');
      });
      db.on('error', function(error) {
        console.error('Error in MongoDb connection: ' + error);
        mongoose.disconnect();
      });
      db.on('connected', function() {
        console.log('MongoDB connected!');
      });
      db.once('open', function() {
        console.log('MongoDB connection opened!');
      });
      db.on('reconnected', function () {
        console.log('MongoDB reconnected!');
      });
      db.on('disconnected', function() {
        console.log('MongoDB disconnected!');
        // mongoose.connect(uri, mongodb_options);
      });

      process.on('SIGINT', function(){
        db.close(function(){
          console.log("Mongoose default connection is disconnected due to application termination");
          process.exit(0)
          });
        }
      );
    }


module.exports = mongodbConnection;
