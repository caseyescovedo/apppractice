/*
This module returns a function that, when called sets up
cookie, json, and urlEncoded parsing on the req object.
*/

const express = require('express');
const cookieParser = require('cookie-parser');

const requestParse = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
};

module.exports = requestParse;
