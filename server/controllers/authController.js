module.exports = {
    checkIfCookieExists: function (req, res, next){
        req.cookies.token === 'admin' ?res.locals.cookiesExist = true : res.locals.cookiesExist = false;
        return next();
    },
    validate: function (req, res, next){
        req.body.user === 'codesmith' && req.body.pass === 'ilovetesting' ? res.locals.validated = true : res.locals.validated = false;
        return next();
    },
    sendCookie: function(req, res, next){
        if (res.locals.validated){
            res.cookie('token', 'admin');
        }
        return next();
    }
};
