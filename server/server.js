const express = require('express');
const app = express();
const path = require('path');
PORT = 3333;
const cookieParser = require('cookie-parser')

/* ========Controllers========*/
const taskController = require('./controllers/taskController.js')
const authController = require('./controllers/authController.js')

/* ========response parsers========*/
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser())

/* ========serves files========*/
app.use(express.static(path.resolve(__dirname, '../assets'))); //serve css and index.js

app.get('/',
  (req, res) => res.sendFile(path.resolve(__dirname, '../views/index.html')) // serve secret.html
)
app.get('/secret',
  authController.cookieChecker,
  (req, res) => res.sendFile(path.resolve(__dirname, '../views/secret.html')) // serve secret.html
)

/* ========ROUTES========*/
app.post('/signin',
  authController.verifyUser,
  (req,res) => res.redirect('/secret')
)

app.post('/post',
  taskController.postTask,
  (req, res) => res.status(200).json(res.locals.newTask)
)

app.get('/get',
  taskController.getTasks,
  (req, res) => res.status(200).json(res.locals.allTasks)
)

app.delete('/delete',
  taskController.deleteTasks,
  (req, res) => res.status(200).json(res.locals.deleted)
)


/* ========errors========*/
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Internal Server Error');
});


/* ========express server========*/
app.listen(PORT, function () {
  console.log(`server listening on port ${PORT}`)
})