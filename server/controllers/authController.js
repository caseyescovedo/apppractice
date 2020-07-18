
authController = {}
// logic to limit login to user: codesmith and pass ilovetesting
// should probably use env to mask passworsd in controller, but time...
authController.login = ((req,res,next) => {
    console.log('where is the body-------->',req.body.user)
const {user,pass} = req.body
// if user and pass match the req, then next()
if(user === 'codesmith' && pass === 'pass'){
    next();
}
else{
   // if user and pass dont maatch the req the return unsuccessful login attempt 
   return ("unsuccessful login attempt")
}

})

module.exports = authController