const router = require('express').Router();
const authController = require('../controllers/authController');

router.post('/', authController.authenticateUser, (req, res) => {
  // If authorization succeeded, set admin cookie & redirect to secret page
  if (res.locals.auth) {
    res.cookie('token', 'admin', { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
    res.redirect('/secret');
  } else {
    // If authorization failed, send error message
    res.status(401).json('unsuccessful login attempt');
  }
});

module.exports = router;
