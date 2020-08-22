const Task = require('../models/TaskModel')

const authController = {};

// authController.createUser = async (req, res, next) => {
//     const { username, password } = req.body;
//     try {
//         const create = await User.create({ username, password })
//         res.locals.create = create
//         next();
//     } catch (err) {
//         console.log('this is error in create user: ', err)
//         // next(err);
//     }
// }

// authController.login = async (req, res, next) => {
//     const { username, password } = req.body;

//     try {
//         const data = await User.findOne({ username, password });
//         // console.log('data is:', data)
//         if (!data) return res.status(400).send('invalid username or password')
//         res.locals.user = data;
//         next()
//     }
//     catch (err) {
//         console.log('this is error in user login: ', err)
//         // next({ log: `userController.login ERROR ${err}` })
//     }
// }

authController.login = async (req, res, next) => {
    const { username, password } = req.body;
    if (username === "codesmith" && password === "ilovetesting") {
        res.redirect('/secret')
    } else {
        res.send('unsuccessful login attempt')
    }
}



module.exports = authController;