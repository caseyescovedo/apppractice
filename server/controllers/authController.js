const authController = {}

authController.login = (req, res, next) => {
    const {username, password} = req.body
    if(username === "codesmith" && password === "ilovetesting"){
        res.cookie('token', 'admin')
        next()
    }
    else {
        res.status(404).send('unsuccessful login attempt')
    }
}

module.exports = authController
