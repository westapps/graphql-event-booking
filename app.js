'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
// import authentication middleware
const isAuth = require('./middleware/isAuth');

const graphQLSchema = require('./graphql/schema/index');
const graphQLResolvers = require('./graphql/resolvers/index');

const util = require('./util/util');
const app = express();
// parse json in request body 
app.use(bodyParser.json());
// allow CORS 
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	if(req.method === 'OPTIONS'){
		return res.sendStatus(200);
	}
	next();
});

// add authentication middleware 
app.use(isAuth);

// graphQL API
app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQLSchema,
    rootValue: graphQLResolvers,
    graphiql: true
  })
);

// REST API
app.get('/', (req, res, next) => {
  res.end('Hello world!');
});

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
