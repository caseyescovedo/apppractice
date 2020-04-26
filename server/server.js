const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const PORT = 3333;
const taskController = require('./controllers/taskController')
const authController = require('./controllers/authController')

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

//serving css
app.get('/css/style.css', (req, res) => {
  res.sendFile(path.join(__dirname, '../assets/css/style.css'));
})
//serving js
app.get('/js/index.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../assets/js/index.js'));
})

//serving static index html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
})
//serving static secret html
app.get('/secret', authController.isLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, '../views/secret.html'));
})

//routes for tasks
app.get('/tasks', taskController.getTasks, (req, res) => {
  res.status(200).json(res.locals.tasks);
})
app.post('/tasks', taskController.postTask, (req, res) => {
  res.status(200).json(res.locals.task);
})
app.delete('/tasks/:id', taskController.deleteTask, (req, res) => {
  res.status(200).json({message: `deleted task ${req.params.id}`});
})

//routes for signin
app.post('/signin', authController.verifyUser, (req, res) => {
  res.redirect('/secret')
})

//page not found 
app.use('*', (req, res) => {
  res.sendStatus(404);
})

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown error',
    status: 400,
    message: { error: 'An error occurred' + err },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})