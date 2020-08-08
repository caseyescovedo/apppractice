const authController={}
authController.login =(req,res,next)=>{
    const admin= {
        user:'codesmith',
        pass:'ilovetesting'
    }
  if(req.body.user===admin.user && req.body.pass===admin.pass){
    res.cookie('token','admin')
      res.redirect('/secret')
  }else{
      res.send('You must be signed in to view this page')
  }
}
authController.sesion =(req,res,next)=>{
    if(req.cookies.token!=='admin') next()
    else res.redirect('/secret')
}
module.exports = authController
