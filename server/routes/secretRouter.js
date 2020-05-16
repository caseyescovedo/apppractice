const express = require('express');
const path = require('path');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/',
  authController.checkForCookie,
  (req, res) => res.sendFile(path.resolve(__dirname, '../../views/secret.html')));

module.exports = router;
