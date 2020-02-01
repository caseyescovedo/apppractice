//Attempts to sign in with designated credentials hang until server is reset.  Unclear what is happening.

module.exports.authController = {
    login: (req,res,next) => {
        const { user, password } = req.body;
        if (user === 'codesmith' && password === 'ilovetesting') {
            res.locals.login = true;
            return next();
        } else {
            res.locals.login = false;
            return next();
        }
    }

}
