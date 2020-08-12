const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3333;

const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');
//STATIC
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './../assets')));

app.get('/secrets', taskController.getTasks);

app.post('/secrets', taskController.postTask);

app.delete('/secrets/:id', taskController.deleteTask);

app.post('/signin', authController.setCookie);
//Index
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './../views/index.html'));
});

//To DO
app.get('/secret', authController.getCookie, (req, res) => {
  res.sendFile(path.join(__dirname, './../views/secret.html'));
});

//GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  const defaultErr = {
    status: 400,
    message: 'Bad Request',
  };
  const error = Object.assign({}, defaultErr, err);

  res.status(error.status).json(error);
});

//PORT
app.listen(PORT, () => {
  console.log('LISTENING ON PORT ' + PORT);
});
