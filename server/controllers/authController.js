const authController = {};

authController.setCookie = (req, res, next) => {
    console.log('in auth controller')
    console.log('req.body in auth: ', req.body)
    if (req.body.user === 'codesmith' && req.body.pass === 'ilovetesting') {
      res.cookie('token', 'admin')
      res.redirect('/secret')
      next()
    }
}

module.exports = authController
