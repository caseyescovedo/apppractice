



const auth = (req, res, next) => {
  //if username and password match, will set cookie and go to next to redirect to secret page
  console.log(req.body)
  console.log(typeof(req.body.user))
  if (req.body.user === "hi" && req.body.password === "hi"){ // checking the username and password
    console.log("we here")
    res.cookie('token', 'admin') // sets the cookiei if the user is logged in
    return next()
  } else {
    console.log("You must be signed in to view this page")
    return res.json("You must be signed in to view this page")
  }
}


// checking the cookie
const checkAuth = (req, res, next) => {
  if (req.cookies.token === 'admin'){
    next()
  } else{
    console.log("You must be signed in to view this page")
    return res.json("You must be signed in to view this page")
  }
}

module.exports = {
  auth,
  checkAuth
};
