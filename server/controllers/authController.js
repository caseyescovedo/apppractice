const authController = {};

authController.checkUserAndPass = (req, res, next) => {
    console.log(req);
    const { username, password } = req.body;
    if (username === 'codesmith' && password === 'ilovetesting') {
        console.log('SUCCESS');
        next();
    }
    else {
        res.send('unsuccessful login attempt');
    }
}

authController.setCookie = (req, res, next) => {
    res.cookie('token', 'admin');
    return next();
}

authController.checkCookie = (req, res, next) => {
    const cookies = req.cookies;
    if (cookies['token'] === 'admin') {
        return next();
    }
    else {
        res.send('You must be signed in to view this page');
    }
}

module.exports = authController;
