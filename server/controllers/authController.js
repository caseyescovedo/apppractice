const authController = {};

// Check user credentials:

authController.verifyUser = (req, res, next) => {
    const { user, pass } = req.body;
    if ((user !== 'codesmith' || pass !== 'ilovetesting') || (user === undefined) || (pass === undefined) ) {
        res.status(403).send('unsuccessful login attempt')
    } else {
        return next()
    }
}

// Give the correct user an admin cookie: 

authController.setCookie = (req, res, next) => {
    res.cookie('token', 'admin')
    return next()
}

// Check if the user has the correct cookie to proceed/operate on /secret page:

authController.checkCookie = (req, res, next) => {
    const { token } = req.cookies;
    if( token !== 'admin' ){
        res.status(403).send('You must be signed in to view this page')
    } else {
        return next()
    }
}


module.exports = authController;
