const authController = {};

//verify the login information to see if credentials are correct
//if incorrect, send message 'unsuccessful login attempt'
authController.verify = (req, res, next) => {
    const { user, pass } = req.body;

    if (user === 'codesmith' && pass === 'ilovetesting') {
        res.cookie('admin', 'token', {httpOnly: true});
        next();
    } else {
        res.status(418).send('unsuccessful login attempt');
    }
}

//check if user already has logged in via cookies
//first check if there are any cookies, and if there are cookies, check for cookie with key 'admin'
//if there is an 'admin' key, then check to see that value is 'token'
//if any fail, redirect to sign in page
authController.connected = (req, res, next) => {
    if (req.cookies.admin) {
        if (req.cookies.admin === 'token') {
            next();
        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
}

module.exports = authController;