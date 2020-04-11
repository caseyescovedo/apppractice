const authController = {}

authController.setCookie = (req, res, next) => {
  res.cookie('token', 'admin')
}

module.exports = authController
