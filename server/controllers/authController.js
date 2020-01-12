const authController = {};

authController.verifyUser = (req, res, err) => {
  console.log('in the authcontroller.verifyuser top')
  console.log(req.body.user, req.body.pass);
  if (req.body.user === 'codesmith' && req.body.pass === 'ilovetesting') {
    res.redirect('/secret');
  }
  res.status(418).send('unsuccessful login attempt')
  res.redirect('/index')
}

module.exports = authController;