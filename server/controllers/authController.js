const authController = {}

//thought here was to check cookie, if value was admin, rediret to /secret. Else, send over a new cookie if 
//username && password matched codesmith && ilovetesting and then redirect to /secret
authController.verify = (req, res, next) => {
    if(req.cookies.token === 'admin') res.redirect('/secret')
    if(req.body.username === 'codesmith' && req.body.pasword === 'ilovetesting'){
        res.cookie('token', 'admin')
        next();
    }
}

module.exports = authController;
