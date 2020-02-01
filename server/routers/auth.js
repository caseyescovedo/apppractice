const express = require('express');

const router = express.Router();


// import controllers
const authController = require('../controllers/authController');

// Using the route I specifically created
router.post('/login', authController.login, authController.setCookie, (req, res, next) => {
  res.redirect('/secret');
});


// Using the route that is currently within the form
router.post('/', authController.login, authController.setCookie, (req, res, next) => {
  res.redirect('/secret');
});


module.exports = router