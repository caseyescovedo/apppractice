const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/', authController.auth, (req, res) => {
  if (res.locals.auth) {
    return res
      .cookie('token', res.locals.token, { httpOnle: true })
      .redirect('../secret');
  }
});

module.exports = router;
