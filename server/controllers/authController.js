
const authController = {};

authController.verifyUser = (req, res, next) => {
  const { user } = req.body;
  const { pass} = req.body;

  if (user === "codesmith" && pass === "ilovetesting") {
    res.cookie('token', 'admin');
    return next();
  } else {
    return res.send('unsuccessful login attempt');
  }
};

authController.checkCookie = (req, res, next) => {
  if (req.cookie.token === 'admin') {
    return next();
  } else {
    return res.send('You must be signed in to view this page');
  }
}



module.exports = authController;
