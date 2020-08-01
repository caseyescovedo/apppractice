module.exports = {
  signin
};

function signin(req, res, next) {
  const {user, pass} = req.body;
  // console.log(req.body);
  // console.log(user, pass);
  if (user === 'codesmith' && pass === 'ilovetesting') {
    res.cookie('token', 'admin');
    next()
  } else {
    res.status(400).json('unsuccessful attempt');
  }
}

