const authController = {};


authController.verifyUser = (req, res, next) => {
    const { username, password } = req.body;
    console.log('inside verifyUser');
    console.log("username: ", username);
    console.log("password: ", password);

    if (username === 'codesmith' && password === 'ilovetesting') {
        return next();
    }
    res.json('unsuccessful login attempt');
}

module.exports = authController;
