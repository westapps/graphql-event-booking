'use strict';

function logErrors (err, req, res, next) {
  console.error(err.stack)
  next(err)
};

function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(err)
  }
};

function error404Handler (err, req, res, next) {
    let err = new Error('Path or File Not Found!');
    err.status = 404;
    next(err);
};

function finalErrorHandler (err, req, res, next) {
  res.status(500)
  res.render('error', { error: err })
};

module.exports = {
	logErrors,
	clientErrorHandler,
	error404Handler,
	finalErrorHandler,
};
