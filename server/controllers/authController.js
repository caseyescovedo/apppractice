const User = require('../models/UserModel');
const path = require('path')

module.exports = {
  //the request body is an empty object so cant currently check to see if 
  //user is codesmith and password is ilovetesting
  verifyUser(req, res) {
    User.find({user: req.body.user, password: req.body.password}, (error, user) => {
      if (error) return res.send('unsucessful login attempt');
      else {
        //once the user has been verified, sending cookies and secret.html 
        console.log('sending user to secret')
        res.cookie('token', 'admin')
        const index = path.resolve(__dirname, '../../views/secret.html')
        return res.sendFile(index);
      }
    })
  }

};
