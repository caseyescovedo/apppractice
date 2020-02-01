const authController = {};

//If the password and username match, attach the cookie to the user
authController.signIn = function(req, res, next) {
  const { user, pass } = req.body;
  if (user === "codesmith" && pass === "ilovetesting") {
    res.cookie("token", "admin", { maxAge: 999999999 });
    res.locals.message = "Authenticated";
  } else {
    res.locals.message = "unsuccessful login attempt";
  }
  next();
};

module.exports = authController;
