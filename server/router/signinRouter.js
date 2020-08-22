const express = require('express');
const router = express.Router();
const authController = require("../controllers/authController");

//Verifying a user route
router.post('/', authController.verifyUser, (req, res) => {
    //if it is unsuccessful login, it won't redirect
    if(res.locals.str === 'unsuccessful login attempt') {
        return res.status(200).json(res.locals.str);
    } 
    //redirect when success
    return res.redirect('/secret.html');
})

module.exports = router;