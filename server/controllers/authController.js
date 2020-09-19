module.exports = {
    authenticate: (req, res, next) => {
        const { userInput, passwordInput } = req.body;
        if (userInput == 'codesmith' && passwordInput == 'ilovetesting'){
            res.cookie('token', 'admin');
            next();
        } else {
            res.json("unsuccessful login attempt");
        }
    },

    checkCookie: (req, res, next) => {
        if (req.cookies.codesmith == "ilovetesting"){
            next();
        }
        else {
            res.redirect('/');
        }
    }
};
