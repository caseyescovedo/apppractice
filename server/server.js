const express = require('express')
const app = express();
const path = require('path');
const PORT = 3333;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

// handle parsing request body
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(express.static('assets'))
// serve index.html
app.get('/', (req,res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'));
})
// serve secret.html
app.get('/secret',
 (req,res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'))
})
// redirect to secret page after signin
app.post('/signin',
  authController.verifyUser,
  (req,res) => {
    res.status(200).json(res.locals.login);
  }
)
// handle get requests
app.get('/api',
  taskController.getTasks,
  (req, res) => {
    res.status(200).json(res.locals.data);
  }
)
// handle post requests
app.post('/api', 
  taskController.postTask,
  (req, res) => {
    res.status(200).json(res.locals.post);
  }
)
// handle delete requests
app.delete('/api',
  taskController.deleteTask,
  (req, res) => {
    res.status(200).json(res.locals.delete);
  }
)

// catch-all route handler 
app.use((req,res) => res.sendStatus(404));

app.listen(PORT, () => {
  console.log('Listening on port', PORT)
});

module.exports = app;