const express = require('express');
const path = require('path');
const app = express()

const PORT = 3333;

const taskController = require('./controllers/taskController')

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/css/style.css', (req, res) => {
  res.sendFile(path.join(__dirname,('../assets/css/style.css')))
})

app.get('/js/index.js', (req, res) => {
  res.sendFile(path.join(__dirname,('../assets/js/index.js')))
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'))
})

app.get('/secret', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/secret.html'))
})

app.get('/tasks', taskController.getTasks, (req, res) => {
  res.status(200).json(res.locals.data);
})

app.post('/tasks', taskController.postTask, (req, res) => {
  res.status(200).json(res.locals.data);
})

app.delete('/tasks/:id', taskController.deleteTask, (req, res) => {
  res.status(200).json(res.locals.data);
})


app.listen(PORT,() => console.log(`Server listening at port ${PORT}...`))
