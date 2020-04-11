const authController = {};

authController.setCookie = (req, res, next) => {
  const { user, pass } = req.body;

  if (user === "codesmith" && pass === "ilovetesting") {
    res.cookie("token", "admin", {
      httpOnly: true,
    });
    return next();
  } else {
    res.locals.failedLogin = "unsuccessful login attempt";
    return next();
  }
};

authController.getCookie = (req, res, next) => {};

module.exports = authController;
