const login = (req, res, next) => {
  try {
    console.log(req.body)
    const { user, pass } = req.body
    if (user === 'codesmith' && pass === 'ilovetesting') {
      res.locals.success = true
    }
    else {
      res.locals.success = false
    }
    return next()
  } catch (error) {
    return next(
      console.error('login/authController error: ', error.message)
    )
  }
}

const setCookie = (req, res, next) => {

  res.cookie("cookie", "nom nom", { httpOnly: true })
  return next();
}

module.exports = {
  login,
  setCookie
};
