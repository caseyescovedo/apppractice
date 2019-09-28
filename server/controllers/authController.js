
const authController = {}

authController.verifyUser = (req, res) => {
if (user === undefined || pass === undefined) {
    return res.redirect('/')
  }
    else 
    if(user === codesmith && pass === ilovetesting) 
    {
        res.cookie('token','admin');
        return res.redirect('/secret')
    }
    else 
    {
      return res.send('unsuccessful login attempt')
    }
}

module.exports = {authController};
