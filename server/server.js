const express = require('express')
const app = express();
const PORT = 3333;
const path = require('path');
const bodyParser = require('body-parser')
const controllers = require('./controllers/taskController.js')

app.use(bodyParser.json());
app.use(express.static('assets'))

//CRD
app.post('/postTask',
  controllers.postTask,
  (req, res) => res.sendStatus(200))

app.get('/getTasks',
  controllers.getTasks,
  (req, res) => res.sendStatus(200))

app.delete('/deleteTask',
  controllers.deleteTask,
  controllers.getTasks,
  (req, res) => res.sendStatus(200))

//boiler
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/index.html'))
})

app.get('/secret', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/secret.html'))
})

app.get('*', (err, req, res, next) => {
  // catch all err 
  // add default err
});

app.listen(PORT)
