const express = require('express');
const PORT = 3333;
const app = express();
const path = require('path')
const taskController = require('./controllers/taskController')
const cookieParser = require('cookie-parser')

// console.log(taskController)

// serve a static page 
app.use(express.static('assets'))
// to be able to read incoming information 
app.use(express.json())
// cookie parser 
app.use(cookieParser())


// use the index.html page
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/index.html'))
})

// gets the secret page
app.get('/secret', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/secret.html'))
})

// inserts the information into the db
app.get('/info', taskController.getTask, (req, res) => {
  console.log(res.locals.getInfo)
  res.status(200).json(res.locals.getInfo)
})

// insets into the db and gets the new information back
app.post('/insert', taskController.postTask, taskController.getTask, (req, res) => {
  res.status(200).json(res.locals.getInfo);
})

// deletes the task 
app.delete('/delete', taskController.deleteTask, taskController.getTask, (req, res) => {
  res.status(200).json(res.locals.getInfo)
})




// TODO 
// NEED TO ADD GLOBAL ERROR HANDLER!!!! 

app.listen(PORT, () => {
  console.log('Listening on port ', PORT)
});