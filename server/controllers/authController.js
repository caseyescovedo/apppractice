module.exports = {
  check (req, res, next) {
    // const { user, pass } = req.body;
    if (req.body.user && req.body.pass) {
      if (req.body.user === "codesmith" && req.body.pass === "ilovetesting") {
        return next();
      }
    } else {
      return res.status(401).send("unsuccessful login attempt");
    }
  },
  setCookie (req, res, next) {
    // const cookie = {};
    res.cookie('token','admin');

    return next();
  },
};
