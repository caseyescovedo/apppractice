const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const PORT = 3333;
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');
const api = require('./routes/api.js');

app.use(express.static(path.join(__dirname,'../assets')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api', api);

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname,'../views/index.html'))
})

app.post('/signin', authController.verifyUser, authController.setCookie, (req, res) => {
  res.redirect('/secret');
});

app.get('/secret', authController.verifyCookie, taskController.createTable, (req, res) => {
  res.sendFile(path.join(__dirname,'../views/secret.html'))
})

app.use('*', (req, res) => {
  res.status(404).send('Not Found');
})

app.use((err, req, res, next) => {
  res.status(500).send('Error: ', err)
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))