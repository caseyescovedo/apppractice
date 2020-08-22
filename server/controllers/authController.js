const { cookie } = require("request");

module.exports = {

  verifyUser: (req, res, next) => {
    const { user, pass } = req.body;
    //on fail
    if (user !== 'codesmith' || pass !== 'ilovetesting') return res.send('unsuccessful login attempt')
    //on success
    res.cookie('token', 'admin')
    return next()
  },

  cookieChecker: (req,res,next) => {
    //on success
    if(req.cookies['token']=== 'admin') return next();
    //on fail
    else res.send('You must be signed in to view this page')
  }
};
