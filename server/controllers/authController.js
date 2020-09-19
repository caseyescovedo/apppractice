//since we're using Auth here, we need to pass in next to make sure we can move on to the next middleware when required

module.exports = {
  //this function would check the information coming in from the request and determine whether
  //the incoming credentials matched the following user: codesmith pass: ilovetesting
  //this middleware will respond with a string if the credential matching fails
  loginAttempt: (req, res, next) => {
    //upon validation, we can use set a cookie using 
  }

};
