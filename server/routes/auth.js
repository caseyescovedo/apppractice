const express = require('express');
const router = express.Router();
const { checkAuth, setCookie } = require('../controllers/authController');

router.post('/', checkAuth, setCookie, (req, res) => res.redirect('../secret'));

module.exports = router;
