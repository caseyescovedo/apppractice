const express = require('express');
const app = express();
const path = require('path');
const PORT = 3333;
const pool = require('./controllers/taskController');
const controller = require('./controllers/taskController');
const router = require('./routes');
const authController = require('./controllers/authController');

//deal with json files
app.use(express.json());

//server static files upon entry
app.use(express.static('views'));
app.use('/', express.static('assets'));
app.use('/secret', express.static('assets'));

//handle form data correctly
app.use(express.urlencoded({ extended: true }));

//handle get req
app.get('/secret',
 (req,res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'))
})

//handle post req
app.use('/api', router);

//route to handle sign in 
app.get('/signin', authController.signin, (req, res) => {
    res.status(200).cookie('token', 'admin').json(res.locals.signin);
});

//catch all errors  
app.use((req, res) => {
    res.status(404).json('wrong end point');
});

//global error handler
app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'express error handler caught unknown middleware error',
      status: 400,
      message: { err: 'An error happened' },
    };
    const errorObj = { ...defaultErr, ...err };
    return res.status(errorObj.status).send(JSON.stringify(errorObj.message));
  });

//listen to port
app.listen(PORT, () => {
    console.log('Listening to port: ', PORT);
}); 