const path = require('path');
const express = require('express');
const cookieparser = require('cookie-parser');

const app = express();
const PORT = 3333;

/*
import controllers
*/
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');


/**
 * global parsers
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());


/**
 * handle requests for static files
 */
app.use('/assets', express.static(path.join(__dirname, '../assets')));


/**
 *  api handlers
 */

app.get('/task',
  taskController.getTask,
  (req, res) => {
    res.status(200).json(res.locals.tasks);
  });

app.post('/task',
  taskController.postTask,
  (req, res) => {
    console.log('task created in database!');
    // not sure why i am sending the new message back yet, maybe the update the DOM?
    res.status(200).json(res.locals.task);
  });

app.delete('/task/:id',
  // authController.checkCookie,
  taskController.deleteTask,
  (req, res) => {
    res.status(200).json(res.locals.deleted);
    //status + send back
  });


/*
 * signin routings
 */
app.post('/signin',
  authController.verifyUser,
  authController.setCookie,
  (req, res) => {
    console.log('access granted');
    // console.log('form content: ', req.body); // -> {user: "", pass: ""}
    res.redirect('./secret');
  }
);


/*
 * root routes index.html and secret.html
 */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.get('/secret',
  authController.checkCookie,
  (req, res) => {
    res.sendFile(path.join(__dirname, '../views/secret.html'));
  });


/*
 *  catch-all route handler for any requests to an unknown route
 */
app.use((req, res, next) => {
  // could do something here?
  // console.log('want to do some other things instead?')
  // res.status(404).send('Page Not Found');
  res.status(404).send('this is 404 from server.js');
});


/**
 * configire express global error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */
// eslint-disable-next-line no-unused-vars

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express global error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errObj = Object.assign(defaultErr, err);
  console.log(errObj);
  res.status(errObj.status).send(errObj.message);
});


if (process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder on the route '/build'
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  });
}


/**
 * start server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;