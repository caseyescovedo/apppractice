// ! imports
const express = require('express');
const app = express();
const path = require('path')
const PORT = 3333;
const cookieParser = require('cookie-parser')
const {postTask, getTasks, deleteTask} = require('./controllers/taskController') // importing middleware functions
const {auth, checkAuth} = require('./controllers/authController')


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
  console.log("we are here")
  res.status(200).sendFile(path.join(__dirname , '../views/secret.html'))
})


// ! Creating the routes
// post a task -- tested in postman
app.post('/tasks', postTask, (req, res) => {
  res.status(200).json(res.locals.data)

})

// get all the tasks -- tested in postman
app.get('/tasks', getTasks, (req, res) => {
  res.status(200).json(res.locals.data)
})


// delete a task -- tested in postman
app.delete('/tasks/:id', deleteTask, (req, res) => {
  res.status(200).json(res.locals.data)
})

// creating the authentication route
// app.post('/auth', auth, (req, res) => {
//   res.redirect("/secret") // redirecting to the secret path which should serve the secret.html
// })

// creating the authentication route
app.post('/signin', auth, (req, res) => {
  res.redirect("/secret") // redirecting to the secret path which should serve the secret.html
})





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


