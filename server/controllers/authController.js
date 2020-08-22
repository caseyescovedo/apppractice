module.exports = {
  saveUserCookie: (req, res, next) => {
    let user = req.body.user;
    let pw = req.body.pw;
    if (user === codesmith && pw === ilovetesting) {
      res.cookie('token', 'admin');
      next();
    } else {
      res.send('You must be signed in to view this page');
    }
  }

  checkUserCookie: (req, res, next) => {

  }
};
