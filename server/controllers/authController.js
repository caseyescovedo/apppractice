const path = require('path');

const authController = {}

authController.verifyAndSetCookie = (req, res, next) => {
  // const { user, pass } = req.body;
  // if user and/or pass is incorrect, send unsuccessful msg
  // if (user !== 'codesmith' || pass !== 'ilovetesting') {
  //   res.status(200).send('Unsuccessful login attempt')
  // } 
  // if user and/or pass is correct, set cookie
  // else {
    res.cookie('token', 'admin', {httpOnly: false});
  // }
  next()
}

module.exports = authController;
