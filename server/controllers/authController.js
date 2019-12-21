const authController = {}

authController.login = (req, res, next) => {
    // res.cookie('codesmith', 123)
    // res.cookie('ilovetesting', 123)
    // return next();
    if (req.body.username === 'codesmith' && req.body.password === 'ilovetesting') {
        // res.cookie('access', 'true', { httpOnly: true })
        // res.redirect('/secret')
        return next()
    }
    else {
        res.redirect('/')
    }
}

module.exports = authController;
