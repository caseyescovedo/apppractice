const authController = {}

authController.verifyUser = (req, res, next) => {
    // check user login input
    const {user, password} = req.body;
    if (user === 'codesmith' && password === 'ilovetesting') res.locals.verified = true;
    else res.locals.verified = false;
    return next();
}


authController.setCookie = (req, res, next) => {
    // if login verified set up cookie
    if (res.locals.verified) res.cookie('token', 'admin');
    return next();
}


module.exports = authController

// only succcessful login cred {user: 'codesmith', password: 'ilovetesting'}
