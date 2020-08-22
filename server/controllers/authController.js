module.exports = {
  checkLogin: (req, res, next) => {
    const { user, pass } = req.body;
    if (user === 'codesmith' && pass === 'ilovetesting') {
      //set cookie
      res.cookie("token", "admin")
      //go to next middleware
      return next();
    }
    //return error message
    return res.status(401).send("unsuccessful login attempt")
  },
  checkCookie: (req, res, next) => {
    const { token } = req.cookies;
    //check if the token exists and that it is equal to admin
    if (token && token === 'admin') return next();
    //otherwise return error message
    return res.status(401).send("You must be signed in to view this page")
  }

};
