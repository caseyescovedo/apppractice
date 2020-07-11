const express = require('express');
const path = require('path');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/', authController.verifyLogin, (req, res) => {
  if (res.locals.success) {
    res.cookie('token', 'admin', { httpOnly: true });
    // res.status(200).sendFile(path.join(__dirname, '../../views/secret.html'));
    res.redirect('/secret');
  } else {
    res.status(401).send(res.locals.error);
  }
});

module.exports = router;