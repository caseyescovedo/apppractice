//require packages
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

//requrie local files
const taskController = require('./controllers/taskController.js');
const authController = require('./controllers/authController.js');

//Port and server
const PORT = 3333;
const app = express();

//parse request bodys and cookies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extened: true}));
app.use(cookieParser());


/*-----route-----*/
//Note: I would have liked to add routers, but I didn't want to mess with file structure

//route handlers for /tasks
app.delete('/tasks', taskController.deleteTask, (req, res) => {
  res.status(200).send('deleted db row successfully');
})
app.post('/tasks', taskController.postTask, (req, res) => {
  res.status(200).send('updated db successfully');
})
app.get('/tasks', taskController.getTasks, (req, res) => {
  res.status(200).json(res.locals.tasks);
})



//rounte handlers for /secret
app.get('/secret', (req, res) => {
  //if there is the expected cookie allow entrance
  if(req.cookies.token === 'admin'){
    res.status(200);
    res.setHeader('content-type', 'text/html;charset=UTF-8');
    return res.sendFile(path.join(__dirname, '../views/secret.html'));
  }
  //if not send message that user must login
  else{
    res.status(401).send("must be signed in to view this page");
  }
});

app.post('/secret', authController.checkCredentials, authController.setCookie, (req, res) => {
  //if auth was unsuccessful send back an error message
  if(res.locals.error){
    res.status(401).send(res.locals.error);
  }
  //otherwise render the page
  else{
    res.status(200);
    res.setHeader('content-type', 'text/html;charset=UTF-8');
    return res.sendFile(path.join(__dirname, '../views/secret.html'));
  }
});



//route handler for /
app.get('/', (req, res) => {
  res.status(200);
  res.setHeader('content-type', 'text/html;charset=UTF-8');
  return res.sendFile(path.join(__dirname, '../views/index.html'));
});



//serve static files
app.use(express.static('assets'));

//global error handler
app.use((err, req, res, next) => {
  res.status(500).send(err);
});

//start server
app.listen(PORT, () => {console.log(`Listening on Port ${PORT}`)});
