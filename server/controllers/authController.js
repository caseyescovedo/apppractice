authController = {}

authController.check = (req,res,next)=>{
    let username = req.body.user;
    let password = req.body.pass;
    console.log(req.body);
    if(username == 'codesmith' && password == 'ilovetesting'){
        console.log('we"re inside');
        res.cookie('password','admin');
        res.redirect('/secret');
    }
    else{
        res.locals.message = "you fool, unsucessful login attempt";
        return next();
    }
}
authController.cookieMonster = (req,res, next)=>{
    console.log(req.cookies)
    if(req.cookies.password != 'admin'){
        res.json('"What are you doing????" - Sung Do');
        // res.redirect('/');
    }
    else{
        return next();
    }
}
module.exports = authController;
