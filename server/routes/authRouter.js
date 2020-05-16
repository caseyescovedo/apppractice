const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/',
  authController.verifyUser,
  (req, res) => res.status(401).send('unsuccessful login attempt'));

module.exports = router;
