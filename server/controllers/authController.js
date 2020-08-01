



const auth = (req, res, next) => {
  if (req.body.user === "" && req.body.password === ""){ // checking the username and password
    res.cookie('token', 'admin')
    return next()
  } else {
    console.log("You must be signed in to view this page")
    return res.json("You must be signed in to view this page")
  }
}





module.exports = {
  auth
};
