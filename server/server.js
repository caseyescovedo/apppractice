const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3333;
const authController = require('./controllers/authController');
const taskRouter = require('./routers/taskRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', express.static(path.join(process.cwd(), 'assets' ))); //serves the index.html

app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(process.cwd(), 'views', 'index.html'));
})

app.use('/task', taskRouter);

app.post('/signin', 
  authController.signin,
  (req, res) => {
    res.redirect('/secret');
})

app.get('/secret',
  authController.isLoggedIn,
  (req, res) => {
    res.status(200).sendFile(path.resolve(process.cwd(), 'views', 'secret.html'));
})

// incorrect endpoint handler
app.use((req, res) => {
  return res.status(400).send('Page Not Found 😔');
})

// global middleware error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware :(',
    status: 500,
    message: { err: 'An error occurred!' }
  };
  const errObj = Object.assign(defaultErr, err);
  console.log('ERR: ', err, errObj.log);
  return res.status(errObj.status).json(errorObj.message);
})

app.listen(PORT, () => {
  console.log(`✨ Magic happens on port ${PORT}! ✨`);
})

module.exports = app;