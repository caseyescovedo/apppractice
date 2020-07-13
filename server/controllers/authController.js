const authController = {};

authController.verifyUser = (req, res, next) => {
  console.log("req.body", req.body);

  if (req.body.user === "codesmith" && req.body.pass === "ilovetesting") {
    // Save cookie
    res.cookie("token", "admin", { httpOnly: true });
    // redirect
    res.redirect("/secret");
  } else {
    res.send("unsuccessful login attempt");
  }
};

module.exports = authController;
