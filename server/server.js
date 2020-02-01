const express = require('express');

const PORT = 3333;

const app = express();

const path = require('path');

const cookieParser = require('cookie-parser');

const taskControllers = require('./controllers/taskController.js')
app.use(cookieParser());
app.use(express.static('views'));
app.use(express.json())

app.get("/", (req, res) => {
  console.log('hit it')
  res.sendFile(path.resolve(__dirname, '../views/secret.html'))
});

app.get("/secret", taskControllers.getTasks, (req, res) => {
  res.status(200).json(res.locals.allTasks)
});

app.post("/secret", taskControllers.postTask, taskControllers.getTasks, (req, res) => {
  console.log('post is getting hit')
  res.status(200).json(res.locals.allTasks)
});

app.post("/secret",taskControllers.checkCookie, (req, res) => {
  res.status(200).json(res.locals.allTasks)
});

app.delete('/secret', taskControllers.deleteTask, taskControllers.getTasks, (req, res) => {
  res.status(200).json(res.locals.allTasks);
})

app.use((req, res) => {
  return res.sendStatus(404)
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware handler", 
    status: '400',
    message: { err: "an error happened" }
  }
  const errObj = Object.assign(defaultErr, err)
  console.log(errObj)
  res.status(errObj.status).json(errObj.message);
})

app.listen(PORT);