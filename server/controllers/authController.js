const authController = {};

//verify user sign in
authController.verify = (req, res, next) => {
    console.log('this is req.body inside verify:', req.body)
    const { username, password} = req.body;
    let verified = false;
    if (username === 'codesmith' && password === 'ilovetesting') {
        verified = true;
    }
    res.locals.verified = verified;
    next();
}

//create cookie
authController.setCookie = (req, res, next) => {
    res.cookie('token', 'admin');
    return next();
}

module.exports = authController;
