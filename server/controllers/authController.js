module.exports = {
  authorizeUser(req, res, next) {
    const { user, pass } = req.body;
    if (user === 'codesmith' && pass === 'ilovetesting') {
      res.cookie('token', 'admin');
      return next();
    }
    return next('Unsuccessful login attempt');
  },
};
