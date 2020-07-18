const express = require('express')
const path = require('path')
const authController = require('../controllers/authController')

const authRouter = express.Router()



 // on submit redirect
 authRouter.post('/signin',authController.login,  (req,res) => {
    res.redirect('/secret')
})


module.exports = authRouter;