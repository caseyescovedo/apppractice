module.exports = {
  login: function (req, res, next) {
    const { user, pass } = req.body;
    if (user.toLowerCase() === 'codesmith' && pass === 'ilovetesting') {
      return next();
    }
    res.status(400).send('unsuccessful login attempt');
  }
};
