const express = require('express');
const app = express();
const path = require('path');

const PORT = 3333;

// adding controllers
const taskController = require('./controllers/taskController.js')
// const authController = require('./controllers/authController.js')

// adding express.json and urlencoder so req body can be parsed
app.use(express.json());
app.use(express.urlencoded())

// serve static files
app.use(express.static(path.resolve(__dirname, '../assets')))

// visiting '/' on browser
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../views/index.html"))
});


//visiting secret
app.get('/secret', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../views/secret.html"))
});

// what happens when someone clicks button for get request? 
// when user hits the '/' endpoint, they are going to 

app.get('/secret', taskController.getTask, (req, res) => {
  console.log('did you finishing getting the task?')
  res.json(res.locals.result)
});

// app.get('/muppet', taskController.sample, (req, res) => {
//   console.log('did you finishing getting the task in muppets?')
//   res.json({"success": "you did it!!!"})
// });



// // global error handler?
// app.use((err, req, res, next) => {

// })


// creating server
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`))