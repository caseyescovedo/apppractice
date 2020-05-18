var { Task } = require('../models/TaskModel');

authController = {

  verifyUser(req, res, next){
    console.log("req.body =",req.body)
    const {user, pass} = req.body;
    if (user === "codesmith" && pass === "ilovetesting"){
        res.cookie("token", "admin");
        return res.redirect("/secret");
    }else{
        res.status(400).send("unsuccessful login attempt");
        return next();
    }
  },

  

}





module.exports = {
    authController

};
