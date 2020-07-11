const express = require('express');
const router = express.Router();

const path = require('path');

const authController = require('../controllers/authController');

// Code not being used - auth route to check cookies attempt
router.get('/', authController.checkAuthToken, (req, res) => {
  console.log(path.resolve('./views', 'secret.html'));
  res.sendFile(path.resolve('./views', 'secret.html'));
});

module.exports = router;
