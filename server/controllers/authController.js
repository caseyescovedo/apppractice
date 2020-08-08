const authController = {}

authController.setAuth = (req, res, next) => {
  // set a cookie to response with pass as key:value as password in plaintext
  // check on browsers
  res.cookie("token", admin) 
  return next()
},

authController.checkAuth = (req, res, next) => {
  if (cookies["token"]) {
    return next()
  }
  res.json({message: 'You need to sign in'})
}
module.exports = authController


