
const authController = {};

authController.verifyUser = (req, res, next) => {
    console.log(req.body)
    const { user, pass } = req.body;
    if (user === "codesmith" && pass === "ilovestesting") {
        next()
    } else {
        return next("Login information is incorrect")
    }
}


module.exports = authController;