const authController = {};

 // The only successful login credentials should be to
 // have a user of `codesmith` and a pass of `ilovetesting`.
 //  Providing these credentials will redirect to the secret 
 // page route as before. Any other credentials (or none at all)
 // will send the string `unsuccessful login attempt`

// authController.verifyUser = (req, res, next) => {
//   // if no cookie check for username and password]
//   let adminCookie = res.cookie['token'];
//   console.log("COOKIE", adminCookie);
//   if (!adminCookie){
//   // check if sign up information matches
//   const { username, password } = req.body;
//   // password is coming in as I love
//   console.log("BODY", username, "PASS:", password);
//   if (username !== 'codesmith' || password !== 'ilovetesting'){
//     return next({
//         msg: { err: 'unsucessful login attempt'}
//     })
//   }
//   // this is not setting the cookie!!!!!!
//   res.cookie('token', 'admin');
//   console.log("SET COOKIE", res.cookie['token']);
//   return next();
// }
//   return next();
// }

module.exports = authController;
