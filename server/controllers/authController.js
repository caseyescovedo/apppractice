module.exports = {
  setCookie: (req, res, next) => {
    if (req.body.user === 'codesmith' && req.body.pass === 'ilovetesting') {
      res.cookie('token', 'admin');
      return next();
    } else 'unsuccessful login attempt';
  },
  deleteCheck: (req, res, next) => {
    text = 'SELECT * from messages where id = $1';
    const { id } = req.params;
    values = [id];
    db.query(text, values)
      .then(message => {
        if (!req.cookie.pass || req.cookie.pass !== message.rows.password) {
          res.status(401); // means unauthorized
        } else {
          return next();
        }
      })
      .catch(err => console.log(err));
  }
};
