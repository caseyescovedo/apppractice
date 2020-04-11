const express = require('express');
const path = require('path');
const app = express();
const PORT = 3333;
const taskController = require('./controllers/taskController');

const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());


//route to serve static files
app.use('/css', express.static(path.join(__dirname,'../assets/css')));
app.use('/js', express.static(path.join(__dirname, '../assets/js')));


//route to serve the html page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'../views/index.html'))
});

//route to check login
app.post('/signin', (req, res) => {
  if(req.body.user !== 'codesmith' || req.body.pass !== 'ilovetesting'){
    res.send('unsuccessful login attempt')
  } else {
    res.sendFile(path.join(__dirname, '../views/secret.html'))
  }
})

//route to get tasks
app.get('/getTask', taskController.getTasks, (req, res) => {
  res.status(200).send(res.locals.tasks);
});

//route to post tasks
app.post('/postTask', taskController.postTask, (req, res) => {
  res.status(200)
});

//route to delete task
app.delete('/deleteTask', taskController.deleteTask, (req, res) => {
  res.status(200)
});

//route to handle any undefinded routes
app.use('*', (req, res) => {
  res.static(400)
});

//global error handler
app.use((err, req, res, next) => {
  res.status(400).send(err)
});

//listen on port 3333
app.listen(PORT, () => console.log('listening on port', PORT));