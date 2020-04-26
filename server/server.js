const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const taskContoller = require('./controllers/taskController');
const authController = require('./controllers/authController');

const PORT = 3333;

const myURI =
  'mongodb+srv://alon:testing123@cluster0-i01cr.mongodb.net/test?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = myURI;

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection
  .once('open', () => console.log('Connection to DB succesful'))
  .on('error', (err) => console.log('Your error', err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/assets', express.static(path.join(__dirname, '../assets')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.get('/secret', authController.verifyCookie, (req, res) => {
  if(res.locals.verifyCookie = true){
  res.sendFile(path.join(__dirname, '../views/secret.html'));
  }
  else res.redirect('/');
});
app.post('/signin', authController.verifyUser, (req, res) => {
  if(res.locals.verify = false){
    res.redirect('/');
  }
  else {
    res.redirect('/secret');
  }
});

app.post('/tasks', taskContoller.postTask, (req, res) => {
  res.json(res.locals.task);
});

app.get('/tasks', taskContoller.getTasks, (req,res) => {
  res.json(res.locals.data);
})

app.use('*', (req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ err: 'An error occured' });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
