const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/', authController.checkUserInput, (req, res, next) => {
  const { user, pass } = res.locals.user;
  if (user === 'codesmith' && pass === 'ilovetesting') {
    res.cookie('token', 'admin');
    res.redirect('/secret');
  } else {
    res.status(401).send('unsuccessful login attempt');
  }
});

module.exports = router;
