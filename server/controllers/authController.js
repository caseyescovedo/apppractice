



const auth = (req, res, next) => {
  console.log("hello")
  if (req.body.user === "codesmith" && req.body.password === "ilovetesting"){ // checking the username and password
    return next()
  } else {
    console.log("You must be signed in to view this page")
    return res.json("You must be signed in to view this page")
  }

}





module.exports = {
  auth
};
