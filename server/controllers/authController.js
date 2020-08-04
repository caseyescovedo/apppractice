// couldnt get the auth to work nt enough time
module.exports = {
    login (req, res, next) {
        const userName = document.getElementById('user').value
        const password = document.getElementById('pass').value
        if (userName == 'codesmith' && password == 'ilovetesting') {
            res.cookie('token', 'admin'); next()}
        else res.send(`unsuccessful login attempt`)
    },
    cookie (req , res, next) { 
        if (req.cookies.token) res.redirect('/secret') 
        else next()},
    

};
