
const authController = {};

//Get all task for main page
authController.verifyUser = (req, res, next) => {
    const { user, pass } = req.body;

    //left off at not getting the body object from the form
    console.log(req.body);

    if(user !== 'codesmith' && pass !== 'ilovetesting'){
        return res.status(400).json('unsuccessful login attempt');
    } else {
        res.cookie('token', 'admin');
        console.log(res.cookie);
        return next();
    }
}

authController.isLoggedIn = (req, res, next) => {
    /* planned to check if user is logged in using cookies. 
      If so, user is redirected to next page. If not, user is sent and err
      with the string 'You must be signed in to view this page'
    */
    return next();
}


module.exports = authController;
