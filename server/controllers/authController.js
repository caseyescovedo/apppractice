const db = require('../models/TaskModel.js');

const authController = {};
//first time signing up 
// authController.newUser = (req, res, next) => {
//     //destructure username from req.body
//     const { username } = req.body;
//     const insertUserArray = [username];
//     //postgresql query to insert user into table
//     const queryString = 'INSERT INTO userTable (username) VALUES ($1)';

//     db.query(queryString, insertUserArray, (err)=>{
//         if(err) next({
//             log: 'Database create new user error',
//             status: '400',
//             message: {err},
//         });
//         next();
//     });
// }
// //setting cookie
// authController.setCookie = (req, res, next) => {
//     //destructure username from request body
//     const { username } = req.body;
//     console.log('Setting cookie here');
//     //sending cookie when user signs in. will last for 10 seconds
//     res.cookie('codesmith', 'ilovetesting', {maxAge: 10000});
//     next();
// }


module.exports = authController;
