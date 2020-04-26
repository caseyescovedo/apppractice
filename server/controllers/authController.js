module.exports = {
  // User authentication. Check for hard coded user/pass and set cookie/redirect accordingly
  authenticate: (req, res, next) => {    
    if (req.body.user === 'codesmith' && req.body.pass === 'ilovetesting') {
      return next()
    } else {
      res.status(500).send('unsuccessful login attempt');
    }
  },
};
