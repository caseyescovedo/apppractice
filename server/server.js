// ! imports
const express = require('express');
const app = express();
const path = require('path')
const PORT = 3333;
const cookieParser = require('cookie-parser')
const {postTask, getTasks, deleteTask} = require('./controllers/taskController') // importing middleware functions


// ! Bodyparser Middleware
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended: true}))




// ! serve the html static assets 
app.use(express.static("assets")) // bring in static assets in the asset folder

// getting the login page
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../views/index.html'))
})

// getting the secret page
app.get('/secret', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../views/secret.html'))
})


// ! Creating the routes
// post a task
app.post('/tasks', postTask, (req, res) => {
  res.status(200).json(res.locals.data)

})

// get all the tasks
app.get('/tasks', getTasks, (req, res) => {
  res.status(200).json(res.locals.data)
})


// delete a task




// ! Creating the global error handling
app.use('*', (req, res) => {
  return res.sendStatus(404)
})

app.use((err, req, res, next) => {
  console.log("global error handler " + err)
  return res.sendStatus(500);
})





// ! Start Server
app.listen(PORT, () => {
  console.log("Listening on Port " + PORT)
})


