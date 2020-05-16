module.exports = {
    authorize: function(req, res, next){
        /* check if there cookies present and if so check for the cookie token */
        if(req.cookies && req.cookies.token === 'admin') next() // move on to the next middleware
        else res.send('You must be signed in to view this page'); // feedback to the users
    },
    authenticate: function(req,res, next){
        /* validate the users login by the codesmiths credintials */
        if(req.body.user === 'codesmith' && req.body.pass === 'ilovetesting'){
            /* set token and redirect to secret */
            res.cookie('token', 'admin');
            return res.redirect('/secret')
        }
        /* failutre to login */
        res.send("unsuccessful login attempt");
    }
};
