const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const PORT = 3333;
const path = require('path');
const taskContoller = require('./controllers/taskController')
const authContoller = require('./controllers/authController');
const authController = require('./controllers/authController');

app.use(express.json()) 
app.use(express.urlencoded( {extended: true} ));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../assets')))
// app.use(express.static(path.resolve(__dirname, '../views')));

app.get('/', (req, res) => {
  return res.sendfile(path.join(__dirname, '../views/index.html'))
})

app.post("/signin", authContoller.login, authController.setCookie, (req, res) => {
  return res.redirect("/secret");
});

app.get('/secret', authController.verifyUser, (req, res) => {
  return res.sendfile(path.join(__dirname, '../views/secret.html'))
})

app.get('/api/secret', taskContoller.getTasks, (req, res) => {
  return res.status(200).json(res.locals.data)
})

app.post('/api/secret', taskContoller.addTask, (req, res) => {
  console.log(res.locals.data)
  return res.status(200).json(res.locals.data)
})

app.delete('/api/secret/:id', taskContoller.deleteTask, (req, res) => {
  return res.status(200).json(res.locals.data)
})






app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})