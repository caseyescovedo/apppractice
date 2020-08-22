module.exports = {
  login: function (req, res, next) {
    const {user, pass} = req.body;
    if (user === 'codesmith' && pass === 'ilovetesting') {
      res.cookie('token', 'admin')
      res.redirect('/secret')
    } else {
      res.send('unsuccessful login attempt')
    }
  }

};
