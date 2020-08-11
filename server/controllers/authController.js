
const User = require('../models/userModel.js');



const authController = {}; 

authController.verifyUser = (req, res, next) => {
    const {user , pass } = req.body; 
    User.findOne({ user , pass } , (error, data) => {
        console.log('data in verifyUser' , data);
        if(error){
            return next(`ERROR in authController.verifyUser: ${error}`);
        } else if(!data || data.user !== 'codesmith' || data.pass !== 'ilovetesting') {
            return res.status(400).send('unsuccessful login attempt')
        } else {
            res.redirect('../views/secret');
        }
    })

   return next();
}

authController.setCookie = (req, res, next) => {
    res.cookie('token' , 'admin');
    console.log('res.cookie.token' , res.cookie.token);
    return next(); 
}

authController.verifyCookie = (req, res, next) => {
    console.log('req.cookies' , req.cookies);
    const {token} = req.cookies; 
    if(!token || token !== 'admin'){
        res.redirect('../views/index.html');
        res.status(400).send('You must be signed in to view this page');
    } 
    return next(); 
}

module.exports = authController;
