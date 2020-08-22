const { Task } = require('./TaskModel.js');

const successfulCredentials = {
  user: 'codesmith',
  pass: 'ilovetesting'
}

module.exports = {

  // retrieve all items from the database and send back to the client as JSON
  signIn: (req, res, next) => {
    const {user, pass} = req.body
    try {
      if (user === successfulCredentials.user && pass === successfulCredentials.pass) {
        res.sendFile('/secret')
        next();
      } else {
        res.send('unsuccessful login attempt')
        next()
      }
    }
    catch(err) {
      next(err)
    }
  },


};

try {
  await Task.find({})
  .then(data => {
    res.locals.tasks = data;
    console.log('found tasks: ', res.locals.tasks)
    next();
  })
}
catch (err) {
  console.log('error in getTasks: ', err)
  return next();
}