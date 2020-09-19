
const authController = {};

authController.login = (req, res, next) => {
    if (!req.body.user || !req.body.pass) {
        res.send('unsuccessful login attempt');
    } else if (req.body.user === 'codesmith' && req.body.pass === 'ilovetesting') {
        return next();  
    } else {
        res.send('unsuccessful login attempt');
    }
};

authController.setCookie = (req, res, next) => {
    res.cookie('token', 'admin');
    console.log('cookie set');
    return next();
};

authController.testCookie = (req, res, next) => {
    //check valid cookie //if valid return next
    if (req.cookies) {
        console.log('authenticated')
        return next();
    } else if (!req.cookies) {
        res.send('You must be signed in to view this page');
    } else {
        res.send('You must be signed in to view this page');
    }
};

module.exports = authController;

