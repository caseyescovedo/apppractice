const express = require('express');
const app = express();
const port = 3333;
const bodyParser = require('body-parser');
const path = require('path');
const taskControler = require('./controllers/taskController');
const authController = require('./controllers/authController');

//parse application
app.use(bodyParser.json());

// Finally found it: https://expressjs.com/en/api.html#express.urlencoded
app.use(express.urlencoded())

//get the index.html file 
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../views/index.html'));
})

//get the secret.html file
app.get('/secret', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../views/secret.html'))
})

//get the css file 
app.get('/css/style.css', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../assets/css/style.css'))
})

//get the js file
app.get('/js/index.js', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../assets/js/index.js'))
})

//post a task 
app.post('/', 
  taskControler.createTask,
  (req, res) => {
    res.status(200).json(res.locals.newTask);
})

//get all tasks 
app.get('/getAllTasks',
  taskControler.getAllTasks,
  (req, res) => {
    res.status(200).json(res.locals.allTasks);
})

//delete a task by id 
app.delete('/:id',
  taskControler.deleteTask,
  (req, res) => {
    res.status(200).json("Your task has been successfully deleted");
})

//redirect from /signin to /secret
app.post('/signin',
  authController.authenticate,
  (req, res) => {
    res.status(200).redirect('/secret')
})


//localhost
app.listen(port, () => {
  console.log('Listening at port 3333')
})