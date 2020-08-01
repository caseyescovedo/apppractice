

const authController = {};

authController.checkCredentials = (req, res, next) => {
    if(req.body.user === 'codesmith' && req.body.pass === 'ilovetesting'){
        //Set cookie
        res.cookie("token", "admin", {maxAge: 5000});
        //Redirect
        return res.redirect('/secret');
    }
    return next()
}

authController.checkForCookie = (req, res, next) => {
    //Grab cookie and see if it matches what we set above
    if(req.cookies.token === 'admin'){
        return next()
    }
    return res.status(400).send("You must be signed in to view this page")
    //If matches then next()
}

module.exports = authController;
