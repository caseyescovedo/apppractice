const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
const router = express.Router();

const PORT = 3333;

const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

// need this to parse req body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// requests from the client
app.post('/post', taskController.postTask, (req, res)=>{
  res.sendStatus(200);
})

app.get('/get', taskController.getTasks, (req, res)=>{
  res.status(400).json(res.locals.allTasks);
})

app.delete('/delete/:id', taskController.deleteTask, (req, res)=>{
  res.sendStatus(200);
})

// handle requests for static files
app.use('/css', express.static('assets/css'));
app.use('/js', express.static('assets/js'));
app.use('/secret', express.static(path.join(__dirname, '../views/secret.html')));
app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname, '../views/index.html'))
})

// catch-all error handler
app.use('/', (req, res)=> res.sendStatus(404));

// error handler
app.use((err, req, res, next)=>{
  let errorMessage = `You've found the catch-call error handler`
  if (err) errorMessage = err;
  return res.status(400).json('error handler: ', errorMessage);
})

app.listen(PORT, console.log('Server listening on port 3333...')); 
