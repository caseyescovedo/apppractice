const db = require('../models/TaskModel')

authController = {};

authController.verifyUser = (req, res, next) => {
    console.log(req.body)
    const { user, pass } = req.body
    const newQuery =
        `SELECT username FROM users WHERE username = '${user}' AND password = '${pass}'`;
    db.query(newQuery)
        .then(data => {
            if (data.rows[0]) {
                console.log("user has been verified")
                return next();
            } else {
                console.log('username/password are invalid');
                res.send("unsuccessful login attempt");
            }
        })
        .catch(err => {
            return next(err);
        })
}

authController.setCookie = (req, res, next) => {
    res.cookie('token', 'admin', { maxAge: 600000, httpOnly: false });
    console.log('cookies have been set')
    return next();
}



module.exports = authController;
