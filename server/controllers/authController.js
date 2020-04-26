module.exports = {
  verifyUser: (req, res, next) => {
    const { user, pass } = req.body
    if (user === 'codesmith' && pass === 'ilovetesting') {
      res.cookie('token', 'admin', {
        maxAge: 99999,
        httpOnly: true,
      }),
      return next();
    }
    else return ('Log not successful');
  }

};
