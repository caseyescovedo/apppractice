module.exports = {

  login: (req, res, next) => {
    const { user, pass } = req.body;
    console.log(user, pass);

    if (user === "codesmith" && pass === 'ilovetesting') {
      next();
    } else { 
      res.send('unsuccessful login attempt');
    }
  },

  setCookie: (req, res, next ) => {
    res.cookie('token', 'admin');
    next();
  },

  checkCookie: (req, res, next) => {
    if (req.cookies) {
      next();
    } else {
      res.send('You must be signed in to view this page');
    }

  },

};
