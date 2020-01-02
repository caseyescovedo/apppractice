const setCookie = (req, res, next) => {
  res.cookie("token", "bearer", { httpOnly: true });
  return next();
};

const verifyUser = (req, res, next) => {
  if (req.body.user === "blah" && req.body.pass === "blahpass") {
    return next();
  } else {
    res.status(400).json("WRONG");
  }
};

const verifyCookie = (req, res, next) => {
  if (req.cookies.token === "bearer") {
    return next();
  } else {
    res.redirect("/");
  }
};

module.exports = {
  setCookie,
  verifyCookie,
  verifyUser
};
