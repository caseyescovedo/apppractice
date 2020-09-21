const express = require('express');
const path = require('path');

const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.checkCookie, (req, res, next) => {
  res.status(200).sendFile(path.resolve(__dirname, '../../views/secret.html'));
});

module.exports = router;
