module.exports = {
  authenticateUser: async (req, res, next) => {
    const token = req.headers['authorization'].replace('Bearer ', '');
    if (!token || token !== 'admin') {
      return next({ error: 'You must be signed in to view this page' });
    }
    return next();
  },
  authenticateAnnonymous: async (req, res, next) => {
    // different appraoch from client-side
    const cookies = req.headers.cookie;
    const allThs = cookies
      .split(';')
      .filter((cookie) => cookie.startsWith(` token=`));
    if (allThs.length) {
      const token = allThs[0].replace(' token=', '');
      if (!token || token !== 'admin') {
        return next({ error: 'You must be signed in to view this page' });
      }
      return next();
    }
    return next({ error: 'You must be signed in to view this page' });
  },
  login: async (req, res, next) => {
    if (!req.body.user || !req.body.pass) {
      return next({ log: 'unsuccessful login attempt' });
    }
    if (req.body.user === 'codesmith' && req.body.pass === 'ilovetesting') {
      res.locals.token = 'admin';
    } else {
      return next({ log: 'unsuccessful login attempt' });
    }
    return next();
  },
};
