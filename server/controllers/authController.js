const authController = {};

authController.verifyUser = (req, res, next) => {
  console.log("req.body: ", req.body)
  // console.log("req.query: ", req.query)
  // console.log("req.params: ", req.params)
  const { user, pass } = req.body;
  // console.log("username: ", username);
  // console.log("password: ", password);

  // const queryString = `SELECT * FROM USERS WHERE username=$1`;
  // const queryValues = [user]

  // db.query(queryString, queryValues)
  //   .then(data => {
  //     console.log('data.rows: ', data.rows);
  //     if (!data.rows[0]) {
  //       return res.json('unsuccessful login attempt')
  //     }

  //     if (data.rows[0].password == pass) {
  //       res.cookie('token', 'admin');
  //       console.log('second line of try block HIT ME')
  //       return next();
  //     }
  //   })
  //   .catch(err => {
  //     return next({
  //       log: `An error occurred while verifying user: ${err}`,
  //       message: { err: "An error occurred in authController.verifyUser" },
  //     });
  //   })


  if (user === 'codesmith' && pass === 'ilovetesting') {
    res.cookie('token', 'admin');
    return next();
  } else {
    return res.json('unsuccessful login attempt')
  }
};


authController.checkCookie = (req, res, next) => {
  const cookie = req.cookies;
  console.log('======> cookie', cookie)
  if (!cookie || req.cookies.token !== 'admin') {
    return res.json('You must be signed in to view this page')
  } else {
    return next();
  }
}


module.exports = authController;
