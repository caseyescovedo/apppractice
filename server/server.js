const path = require('path')
const express = require('express');
const app = express();
const PORT = 3333
const cors = require('cors')
const taskController = require('./controllers/taskController')


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/secret/postTask', taskController.postTask, (req,res) => {
  res.status(200).send('recieved')
})

app.get('/secret/getTasks', taskController.getTasks, (req,res) => {
  res.status(200).json(res.locals.items)
})

app.delete('/secret/deleteTask', taskController.deleteTask, (req,res) => {
  res.status(200).send('deleted')
})

app.get('/secret', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/secret.html'))
})
app.use('/', express.static(path.resolve(__dirname,'../assets/')))

app.use('/', (req, res) => {
  res.sendFile(path.resolve(__dirname,'../views/index.html'))
})

app.use('/', (req, res) => res.type('css'))



app.listen(PORT, () => {
  console.log('listening on port: ', PORT)
} )