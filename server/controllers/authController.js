module.exports = {
    verifyUser: (req, res, next) => {
        const { user, pass } = req.body;
        if(user === 'codesmith' && pass === 'ilovetesting') {
            res.cookie('token', 'admin');
            return next();
        }

        return res.status(400).send("unsuccessful login attempt");
    },

    isLoggedIn: (req, res, next) => {
        if(req.cookies.token === 'admin') {
            return next();
        }

        return res.status(400).send("You must be signed in to view this page");
    }

};
