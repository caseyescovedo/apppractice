const authController = {};

authController.login = (req, res, next) => {
    const { user, pass } = req.body;
    if (user === "codesmith" && pass === "ilovetesting") { 
        return next();
    } else { 
        return next("Please enter valid login and password");
    }
}

authController.addCookie = (req, res, next) => {
    res.cookie('access', 'true')
    return next();
}

module.exports = authController;