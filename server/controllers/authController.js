authController = {}

authController.signIn = (req, res, next) => {
  res.redirect('/secret')
}

module.exports = authController;