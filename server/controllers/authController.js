const Session = require("../models/TaskModel");
const authController = {};
//ran out of time eeek
// Modify your code to enforce the following authentication measures. 
//(Use the `server/controllers/authController.js` file to add any middleware functions):
// - [ ] The only successful login credentials should be to have a user of `codesmith` and a pass of 
//`ilovetesting`. Providing these credentials will redirect to the secret page route as before. Any other credentials (or none at all) will send the string `unsuccessful login attempt`
// - [ ] Providing the correct login credentials should set a cookie on the client with a key of `token` 
//and a value of `admin`
// - [ ] Visiting the `http://localhost:3333/secret` route directly should now check for the valid cookie 
//before sending the secret page. If the cookie is not valid (or does not exist), send back the string 
//`You must be signed in to view this page`

//find the appropriate session for this request in the database, then
//  verify whether or not the session is still valid.

// authController.verifyUser = userController.verifyUser = (req, res, next) => {
//     if (req.body.password === 'ilovetesting')
//         (err, result) => {
//             if (result) {
//                 res.locals.result = true;
//                 res.locals.userid = "admin";
//                 return next();
//             } else {
//                 //console.log("password does not match");
//                 res.locals.result = false;
//                 return next();
//             }
//         };



    // authController.startSession = (req, res, next) => {
    //     //write code here
    //     Session.create({ "codesmith": "ilovetesting" });

    //     return next();
    // };



    module.exports = authController;