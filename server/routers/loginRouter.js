const express = require('express');
const authController = require('../controllers/authController');
const loginRouter = express.Router();
const path = require('path');

loginRouter.use(express.static('assets'));

loginRouter.use('/login', authController.authenticate, (req, res) => {
    res.redirect('/secret');
})

loginRouter.use('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../views/index.html'), (err) => {
        if (err) res.status(400).json("There was an error loading the home page.");
    })}
)


module.exports = loginRouter;