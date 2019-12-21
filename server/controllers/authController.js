const pool = require('../models/TaskModel');
const authController = {};


authController.checkCookie = (req,res,next) => {
  if (req.cookies.token !== 'admin') return res.send('You must be signed in to view this page')
  console.log('Check cookie',req.cookies.token)
  next();
}


module.exports = authController;
