const authController = {};

//check if the right pw combo is here
authController.authenticate = (req, res, next) => {
  console.log(req.body);
  //destructure req body from form into user and pass
  const { user, pass } = req.body;
  //check against only correct combo
  if (user === 'codesmith' && pass === 'ilovetesting') {
    //set cookie
    res.cookie('token', 'admin');
    //return next to render page
    return next();
  } else {
    //else send this directly, do not return next (do not want to resend staus code)
    res.send('unsuccessful login attempt');
  }
}

//check for the cookies to access secret page
authController.checkCookie = (req, res, next) => {
  //check cookies for correct key-value
  if (req.cookies.token === 'admin') {
    return next()
  } else {
    res.send('You must be signed in to view this page');
  }
}

module.exports = authController;
