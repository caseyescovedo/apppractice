const authController = {};

//Verifying a user controller
authController.verifyUser = (req, res, next) => {
    // Getting a user and pass value from the req.body
    const { user, pass } = req.body;
    
    // Check whether the value matches to expected
    if(user === 'codesmith' && pass === 'ilovetesting'){
        res.cookie('token', 'admin');
        return next();
    } else {
        res.locals.str = 'unsuccessful login attempt';
        return next();
    }


}

module.exports = authController;
