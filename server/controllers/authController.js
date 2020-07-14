const signIn = (req, res, next) => {
    const { user, pass } = req.body
    if(user === 'codesmith' && pass === 'ilovetesting') {
        res.cookie('token', 'admin')
        res.locals.success = true
    } else {
        res.locals.success = false
    }
    next()
}


const isSignedIn = (req, res, next) => {
    const { token } = req.cookies
    res.locals.isSignedIn = (token === 'admin')
    next()
}


module.exports = {
    signIn,
    isSignedIn
};
