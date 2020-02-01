const authController = {};

//controller for checking the user, if the username and password does not match return message
authController.checkUser = (req, res, next) => {
 const username = 'codesmith';
 const password =  'ilovetesting';
 const testUser = req.body.username;
 const testPass = req.body.password;
 if (testUser === username && testPass === password){
     //res.send({message: 'unsuccessful login attempt'})
 }
  next();
};

//controller for setting the cookie 
authController.addCookies = (req, res, next) => {
    res.cookie('Adding Cookies!', true, {maxAge : 300000})
    next()
};


//controller for checking if there is a cookie, if a cookie does not exist return a message
authController.checkCookie = (req, res, next) => {
    console.log('cookies', req)
    const cookie = req.cookies;
    if(cookie === 'Adding Cookies!=true') {
        // res.send({message: 'You must be signed in to view this page'})
    } else {
        return next()
    }
}

module.exports = authController; 
