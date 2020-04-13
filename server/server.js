const express = require('express');
const path = require('path');
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');
const cookieParser = require('cookie-parser');
const PORT = 3333

const app = express();

// body parser
app.use(express.json());
// cookie parser
app.use(cookieParser());

// serves CSS and JS from assets
app.use('/secret', express.static(path.join(__dirname, '../assets')));

// getTasks
app.get('/getTasks', taskController.getTasks, (req, res) => {
  res.status(200).send(res.locals.items);
});

// postTask
app.post('/postTask', taskController.postTask, taskController.getTasks, (req, res) => {
  res.status(200).send(res.locals.items);
});

// deleteTask
app.delete('/deleteTask', taskController.deleteTask, (req, res) => {
  res.status(200).send('Successfully deleted task!');
});

// serves secret.html
app.use('/secret', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/secret.html'));
})

app.use('/login', authController.verifyUser, (req, res) => {
  console.log(req.cookies);
  // tried redirecting to '/secret' and '../views/secret.html', neither working
  res.sendFile('../views/secret.html');
})

// serves index.html
app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'))
});

// global error handler
app.use((err, req, res, next) => {
  res.status(500).send('An error occured.');
})

// unknown route handler
app.use('/*', (req, res) => {
  res.status(404).send('Page not found.');
})


app.listen(PORT, () => { console.log(`App is listening on ${PORT}`) }); 