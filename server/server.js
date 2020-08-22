const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')

const taskController = require('./controllers/taskController')
const authController = require('./controllers/authController')

const app = express()

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser())

app.use(express.static('./assets'))

app.get('/secret', (req, res) => {
  if (req.cookies.token === 'admin') {
    res.sendFile(path.resolve(__dirname, '../views/secret.html'))
  } else {
    res.send('You must be signed in to view this page')
  }
})

app.post('/addTask', taskController.postTask)

app.post('/deleteTask', taskController.deleteTask)

app.post('/signin', authController.login)

app.get('/getItems', taskController.getTasks)



app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/index.html'))
})



app.listen(3333)