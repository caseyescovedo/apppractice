const User = require('../models/TaskModel');
const authController = {};

authController.verifyUser = (req, res, next) => {
    const { user, pass } = req.body;
    if(user === 'codesmith' && pass === 'ilovettesting'){
        res.cookie('token', value, {httpOnly: true});
        res.redirect('./../views/index.html');
    }
    else {
        res.send('unsuccessful login attempt');
    }
    return next();
}

module.exports = authController;
