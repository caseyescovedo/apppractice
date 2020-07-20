const express = require('express')
const path = require('path')
const authController = require('../controllers/authController')

const authRouter = express.Router()



 // on correct submit redirect ton secret
 authRouter.post('/signin', (req,res) => {
    res.redirect('/secret')
})

// //on incorrect submit redirect to start
// authRouter.post('/signin',authController.login, (req,res) => {
//     res.redirect('/')
// })


module.exports = authRouter;