module.exports = {
  verifyUser: (req, res, next) => {
    const { user, pass } = req.body;
    if (user === "codesmith" && pass === "ilovetesting") {
      res.cookie("token", "admin");
      res.redirect("/secret");
    } else res.json("unsuccessful login attempt");
  },
};
