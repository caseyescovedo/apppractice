const express = require('express');
const cookieParser = require('cookie-parser')
const path = require('path');
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');
const app = express()

app.use(express.json());
app.use(cookieParser())

app.get('*', express.static(path.join(__dirname, '../assets')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'))
})

app.post('/signin', authController.setCookie, (req, res) => {
  console.log('inside signin in server')
  return res.status(200)
})

app.get('/secret', (req, res) => {
    console.log('REQ.COOKIES: ', req.cookies)
    if(req.cookies.token === 'admin'){
      res.sendFile(path.join(__dirname, '../views/secret.html'))
    } else {
      res.send('You must be signed in to view this page')
    }
})

app.get('/tasks', taskController.getTasks, (req, res) => {
    return res.status(200).json(res.locals.task)
})

app.post('/tasks', taskController.postTask, (req, res) => {
    return res.status(200).json(res.locals.task)
})

app.delete('/tasks/:id', taskController.deleteTask, (req, res) => {
    return res.status(200)
})

// app.use((err, req, res, next) => {
//     const defaultErr = {
//       log: 'Express error handler caught unknown middleware error',
//       status: 400,
//       message: { err: 'An error occurred' },
//     };
//     const errorObj = Object.assign({}, defaultErr, err);
//     console.log(errorObj.log);
//     return res.status(errorObj.status).json(errorObj.message);
//   });

app.listen(3333, () => console.log('Listening on port 3333'))