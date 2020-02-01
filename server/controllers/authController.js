const db = require('../models/TaskModel.js');
const authController = {};

authController.setCookie = (req,res, next) => {
    res.cookie('user', true, {
        max: 20000
    })
    return next();
}

authController.checkCookie = (req, res, next) => {
    const cookies = req. cookies;
    if(cookies[user] === 'true') return next();
    else res.send({message: "Please log in"})
}









module.exports = authController;
