const User = require('../models/userModel.js');


const authController = {};

const login = () => {
  const username = document.getElementById('user').innerText
  const password = document.getElementById('pass').innerText
  const body = {
    username,
    password
  }
  fetch('/user/signup', {
    method: "POST",
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(body);
  })
}

authController.verifyUser = (req, res, next) => {
  User.findOne({ 'codesmith': req.body.username })
    .then(user => {
      if ('ilovetesting' === req.body.password) {
        next();
      }
      return next('unsuccessful login attempt');
    });
}

module.exports = {


};
