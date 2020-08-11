const db = require('../models/TaskModel.js')
const authController = {};

authController.verifyUser = (req,res,next) => {
 console.log(req.body)
  const username = req.body.user;
  const password = req.body.pass;
  console.log(username, password)

  if(username === 'codesmith' && password === 'ilovetesting') {
      return next();
    } else {
      return next({
        status: 500,
        log: 'unsuccessful login attempt'})
    }
}

authController.setCookie = (req, res, next) => {
    // write code here
    res.cookie(token, 'admin');
    return next();
  };

// authController.setSSIDCookie = (req, res, next) => {
//     res.cookie('ssid', res.locals.id, { httpOnly: true });
//     return next();
//   };

// authController.isSignedIn = (req, res, next) => {
//     // write code here
//     if (req.cookies.ssid === undefined) {
//       return res.redirect('/');
//     }
//     Session.findOne({ cookieId: req.cookies.ssid }, (err, session) => {
//       if (err) return next(`Error in sessionController.startSession: ${JSON.stringify(err)}`);
//       if (session === null) {
//         return res.redirect('/signup');
//       }
//     });
//     return next();
//   };

module.exports = authController;
