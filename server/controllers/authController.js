const setCookie = (req, res, next) => {
    res.cookie('pass', 'admin', {httpOnly:true})
    return next()
}

const verifyCokie = (req, res, next) => {

}



module.exports = {
    setCookie,
    verifyCokie
};
