const express = require('express');
const app = express ();
const path = require ('path');
const PORT = 3333;
const { getTask, postTask, deleteTask } = require('./controllers/taskController')

// deal with encoded files
app.use(express.urlencoded({ extended: true }));
// serve up static files
app.use('/', express.static(path.join(__dirname, '../assets')));

// serve index.html as landing page
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../views/index.html'))
})

//serve secret.html when called
app.get('/secret', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../views/secret.html'))
})

// route for task GET
app.get('/items', getTask, (req, res) => {
  console.log('SERVER GET TASK')
  return res.status(200).json(res.locals.data);
})

// route for task POST/ADD
app.post('/items', postTask, (req, res) => {
  return res.status(200).json(res.locals.data);
})

// route for task DELETE
app.delete('/items', deleteTask, (req, res) => {
  return res.status(200).json(res.locals.data);
})

// route for submitting login
app.post ('/login',)

// return 404 if no matching routes are found.
app.use('*', (req, res) => {
  return res.sendStatus(404);
})

app.use((err, req, res, next) => {
  console.log('Error: ', err);
  return res.sendStatus(500);
})

app.listen (PORT, () => {
  console.log(`Server is listening on port ${PORT}.`)
});