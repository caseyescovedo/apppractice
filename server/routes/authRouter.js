const router = require('express').Router();
const authController = require('../controllers/authController');

router.post('/', authController.authenticateUser, (req, res) => {
  if (res.locals.auth) {
    res.cookie('token', 'admin', { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
    res.redirect('/secret');
  } else {
    res.status(401).json('unsuccessful login attempt');
  }
});

module.exports = router;
