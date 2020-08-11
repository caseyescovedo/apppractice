const express = require('express');
const app = express();
const PORT = 3333;
const path = require('path')
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');
 
const cookieparser = require('cookie-parser')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieparser())


app.use(express.static('views'));
app.use(express.static('assets'));
  

app.post('/signin', (req, res) => {
  res.redirect('/secret')
})

app.get('/secret', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/secret.html'))
})

app.get('/getTasks', taskController.getTasks, (req, res) => {
  res.status(200).json(res.locals.posts);
});

app.post('/postTask', taskController.postTask, (req, res) => {
  console.log('res.locals is ', res.locals.post);
  // take user input attach it to req, add it to res
  return res.status(200).json(res.locals.post);
});

app.delete('/deleteTask/:id', taskController.deleteTask, (req, res) => {
  return res.status(200).send('sucessfully delete');
});

app.use('*', (req, res) => res.sendStatus(404));

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler has caught a middleware error',
    status: 400,
    message: { err: 'Please check server for error' },
  };
  const someErr = { ...defaultErr, ...err };
  console.log(someErr.status);
  console.log(someErr.log); 
  res.status(400).json(someErr.message); 
});

app.listen(PORT, () => `Port is OPEN at ${PORT}`);
module.exports = app;
