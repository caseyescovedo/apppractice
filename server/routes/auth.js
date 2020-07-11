const express = require('express');
const path = require('path');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/', authController.verifyLogin, (req, res) => {
  console.log('res.locals.success', res.locals.success);
  console.log('res.locals.error', res.locals.error);
  if (res.locals.success) {
    console.log('res.locals.success is truthy')
    res.cookie('token', 'admin', { httpOnly: true });
    res.status(200).sendFile(path.join(__dirname, '../../views/secret.html'));
  } else {
    console.log('res.locals.success is not truthy');
    res.status(401).send(res.locals.error);
  }
});

module.exports = router;