const authController = {}


authController.loginCheck = (req, res, next) => {
    if(req.body.user === 'codesmith' && req.body.pass === 'ilovetesting'){
        res.cookie('token', 'admin')
        res.redirect('/secret');  
        next();
    } else {
        res.send('unsuccessful login attempt')
    }
}
// authController.cookieCheck = (req, res, next) => {
//         if(req.cookies.token === 'admin'){
//             res.redirect()
//         next();
//     } else {
//         res.send('You must be signed in to see this page.')
//     }
// }

module.exports = authController



