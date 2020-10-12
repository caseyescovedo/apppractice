module.exports = {
  checkLogin:  (req,res, next)=>{
   
    const {user, pass}= req.body;
    if(user=='codesmith' &&  pass=='ilovetesting'){
      res.cookie('token', 'admin');
      return next();
    }
    else res.send(`unsuccessful login attempt`);
  },
  checkCookies: (req,res, next)=>{
    if(req.token=='admin') return next();
    else res.send(`You must be signed in to view this page`);
  }
};
