const express = require('express')
const path = require('path')
const taskController = require('./controllers/taskController')

const app = express()

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('./assets'))

app.get('/secret', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/secret.html'))
})

app.post('/addTask', taskController.postTask)

app.post('/deleteTask', taskController.deleteTask)

app.get('/getItems', taskController.getTasks)



app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/index.html'))
})



app.listen(3333)