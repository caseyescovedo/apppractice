const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const PORT = 3333;
const path = require('path');
const taskContoller = require('./controllers/taskController')

app.use(express.json()) 
app.use(express.urlencoded);
app.use(cookieParser);

app.use('/assets', express.static(path.join(__dirname, '../assets')))

app.get('/', (req, res) => {
  return res.sendfile(path.join(__dirname, '../views/index.html'))
})

app.get('/secret', taskContoller.getTasks, (req, res) => {
  return res.status(200).json(res.locals.data)
})

app.post('/secret', taskContoller.addTask, (req, res) => {
  return res.status(200).json(res.locals.data)
})

app.delete('/secret/:id', taskContoller.deleteTask, (req, res) => {
  return res.status(200).json(res.locals.data)
})




app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})