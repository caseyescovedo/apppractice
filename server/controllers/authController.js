const Task = require('../models/TaskModel.js')
const mongoose = require('mongoose')
const express = require('express')
const authController = {};




authController.checkUser = (req, res, next)=> {
    console.log('inside authController', req.body, req.params)
    const { user, pass } = req.body;
    if (user != 'codesmith' || pass != 'ilovetesting') {
        console.log('login failed')
        res.status(400).send('unsuccessful login attempt')
    }
    else {
        res.cookie('token', 'admin', { maxAge: 900000, httpOnly: true });
        console.log('cookie added')
        return next();
    }
    
}

authController.checkCookie = (req, res, next) => {
    console.log(req)
    const cookies = req.cookies;
    if (cookies['token'] === 'admin') {
        return next();
    }
    res.status(400).send(`You must be signed in to view this page`);
}



module.exports = authController;
// [ ] The only successful login credentials should be to have a user of `codesmith` and a pass of `ilovetesting`.
//  Providing these credentials will redirect to the secret page route as before. 
// Any other credentials (or none at all) will send the string `unsuccessful login attempt`
// - [ ] Providing the correct login credentials should set a cookie on the client with a key of `token` and a value of `admin`
// - [ ] Visiting the `http://localhost:3333/secret` route directly should now check for the valid cookie before
//  sending the secret page. If the cookie is not valid (or does not exist), send back the string `You must be signed in to view this page`