const path = require('path');
const express = require('express');
const taskController = require('./controllers/taskController')
const authController = require('./controllers/authController')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const urlencodedParser = require('urlencoded-parser');
const app = express();

//utilize express, path, bodyparser, and probably cookie parser
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(urlencodedParser); //this lets us grab the body data for Authenitcation purposes

//set up a path for all static requests (style/JS in the the assets folder)
//since this is not based on any sort of pre-eminent path (like /getAssets leading into assets, we leave the first portion blank)
app.use(express.static(path.join(__dirname, '../assets')))

//the initial get for te index/login page
app.get('/', (req, res) => {
  console.log("intial get")
  res.sendFile(path.join(__dirname, "../views/index.html"))
})


app.post('/signin', authController.checkCred, (req, res) => {
  if (res.locals.pass === true) { //this allows for the cookie to grant access if going straight to /secret
    res.cookie("token", "admin" )
    res.sendFile(path.join(__dirname, "../views/secret.html"))
  }
  else {
    res.status(401).send("You must be signed in to view this page")
  }
})

// the get for the secret page after the login
app.get('/secret', (req, res) => {
  if (req.cookies.token === 'admin') {
    console.log("already authorized")
    res.sendFile(path.join(__dirname, "../views/secret.html"))
  }
  else {
    res.status(401).send("You must be signed in to view this page")
  }
})

//get all the tasks
app.get('/getTasks', taskController.getTasks, (req, res) => {
  res.json(res.locals.tasks);
})

//add an item to databse and sends back that result to update things without refresh
app.post('/postTask', taskController.postTask, (req, res) => {
  res.json(res.locals.oneTask);
}) 

//deletes an item from databse
app.delete('/deleteTask', taskController.deleteTask, (req, res) => {
  res.sendStatus(200);
})

app.use((err, req, res, next) => { //global err handler, blame the user, log the err
  console.log(err);
  return res.status(500).send('bad request');
});


const PORT = 3333;

app.listen(PORT, () => {
  console.log('Server is listening on Port:', PORT, '...')
});