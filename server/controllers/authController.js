const authController = {};

authController.authenticate = (req, res, next) => {
    const { user, pass } = req.body;
    if (user === 'codesmith' && pass === 'ilovetesting') {
        res.cookie('token', 'admin', {
            // secure: true,
            // httpOnly: true,
            maxAge: 90000,
        });
        return next();
    }
    else res.status(200).json('unsuccessful login attempt');
};

module.exports = authController;
