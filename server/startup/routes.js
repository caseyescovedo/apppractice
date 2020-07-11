/*
This module provides a function that, when called assigns all routers
to links on the express app passed as argument
*/

const express = require('express');
const path = require('path');

const authorize = require('../middleware/authorize'); // this here is messy and I hate it, but the refactor would take too long
const tasks = require('../routers/tasks');
const signin = require('../routers/signin');
const globalErrorHandler = require('../middleware/globalErrorHanlder');

const routes = (app) => {
  // routes
  app.use('/tasks', tasks);
  app.use('/signin', signin);

  //Delivers Static Pages
  app.use('/', express.static(path.join(__dirname, '..', '..', 'views')));
  app.use(
    '/secret',
    authorize,
    express.static(path.join(__dirname, '..', '..', 'views', 'secret.html'))
  );
  app.use(
    '/css',
    express.static(path.join(__dirname, '..', '..', 'assets', 'css'))
  );
  app.use(
    '/js',
    express.static(path.join(__dirname, '..', '..', 'assets', 'js'))
  );

  //Handle the stuff that falls through the cracks
  app.use('*', (req, res) => res.sendStatus(404));
  app.use(globalErrorHandler);
};

module.exports = routes;
