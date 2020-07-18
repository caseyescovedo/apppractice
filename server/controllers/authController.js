const authController = {};

// obtain username and password from the request body and validate
authController.verifyUser =  (req, res, next) => {
  const {user, pass} = req.body;
  if (user === 'codesmith' && pass === 'ilovetesting') {
    return next()
  } else {
    // if verification fail send a specific message to guide the user with out provide any security compromising detail
    res.locals.error = 'Unsuccessful login attempt'
    return next()
  }
}

// set a cookie if login is valid
authController.setCookie = (req, res, next) => {
  res.cookie('token', 'admin', {httpOnly: true});
  return next();
}

// check if cookie is valid, before load secret page
authController.checkCookie = (req, res, next) => {
  if ( req.cookies.token === 'admin') {
    return next();
  } else {
    // if verification fail send a specific message to guide the user with out provide any security compromising detail
    res.locals.error = 'You must be signed in to view this page'
    return next()
  }
}

module.exports = authController;
