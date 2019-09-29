const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const PORT = 3333;
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const taskController = require('/controllers/taskController');
const authController = require('/controllers/authController');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/assets', express.static(path.join(__dirname,'../assets')))

app.get('/', (req,res) => {
    res.sendFile(path.join( __dirname, '../views/index.html'))
})

app.get('/secret' , (req,res,next) => {
    res.sendFile(path.join(__dirname, '..views/secret.html'))
})

app.post('/secret', taskController.postTask, (res,req,next) => {
  res.status(200).json(res.locals.item);
})

app.get('/secret', taskController.getTasks, (res,req,next) => {
  res.status(200).json(res.locals);
})

//global error handler
app.get('*', function(req, res, next) {
    res.sendStatus(404);
  })
  app.use(function errorHandler (err, req, res, next) {
    defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 404,
      message: { err: 'An error occurred' }
    }
    let errorObj = Object.assign(defaultErr,err)
    console.log(errorObj.log)
    res.status(errorObj.status).json(errorObj.message)
  })

app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`));

module.exports = app;