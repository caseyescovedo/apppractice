const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

router.post('/', authController.checkLogin, (req, res) => {
  res.status(200).send({ msg: res.locals.msg });
});

module.exports = router;
