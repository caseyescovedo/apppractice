const setCookie = (req, res, next) => {
    res.cookie('token', 'admin', {httpOnly:true})
    return next()
}

const verifyCokie = (req, res, next) => {
    if (req.cookies.token === 'admin') {
        console.log('matches')
        return next()
    } else {
        console.log('no cookies')
        res.redirect('/')
    }
    console.log('my cookie', req.cookies)
}

const verifyUser = (req, res, next) => {
    // console.log('req.body in verifyuser', req.body)
    if (req.body.user === 'codesmith' && req.body.pass === 'ilovetesting') {
        return next()
    } else {
        res.status(400).json('You are not authorized')
    }
}



module.exports = {
    setCookie,
    verifyCokie, 
    verifyUser
};
