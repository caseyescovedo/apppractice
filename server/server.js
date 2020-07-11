const path = require('path');
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const { postTask, getTasks, deleteTask } = require('./controllers/taskController')
const { signIn, isSignedIn } = require('./controllers/authController')

const app = express()
const PORT = 3333

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())

// Static files
app.use(express.static(path.join(__dirname, '..', 'assets')))


// Secrets
app.get('/secret', isSignedIn, (req, res) => {
    if(res.locals.isSignedIn) {
        res.sendFile(path.join(__dirname, '..', 'views', 'secret.html'))
    } else {
        res.send("You must be signed in to view this page")
    }
  });


// Post task
app.post('/tasks', postTask, (req, res) => {
    res.json(res.locals)
})


// Get tasks
app.get('/tasks', getTasks, (req, res) => {
    res.json(res.locals.tasks)
})


// Delete task
app.delete('/tasks', deleteTask, (req, res) => {
    res.send('ok')
})


//Sign in post form
app.post('/signin', signIn, (req, res) => {
    if(res.locals.success) {
        res.redirect('/secret')
    } else {
        res.send("unsuccessful login attempt")
    }
})


// Home
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
  });


// Start app
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})