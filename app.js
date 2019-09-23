'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQLSchema = require('./graphql/schema/index');
const graphQLResolvers = require('./graphql/resolvers/index');

const util = require('./util/util');
const app = express();

app.use(bodyParser.json());
// REST API
app.get('/', (req, res, next) => {
  res.end('Hello world!');
});
// graphQL API
app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQLSchema,
    rootValue: graphQLResolvers,
    graphiql: true
  })
);

// log errors
app.use(util.logErrors);
app.use(util.clientErrorHandler);
// catch 404 and forward to error handler
app.use(util.error404Handler);
// final error handler
// configuration for development environment
if(process.env.NODE_ENV === 'development') {
   console.log("running in development environment");
   app.use(express.errorHandler());
 };
// Set the environment variable NODE_ENV to production, to run the app in production mode.
// configuration for production environment (NODE_ENV=production)
if(process.env.NODE_ENV === 'production') {
   console.log("running in production environment");
   // configure a generic 500 error message
   app.use(util.finalErrorHandler);
};


module.exports = app;
