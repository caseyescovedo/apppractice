const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const PORT = 3333;

// require controllers
const taskController = require("./controllers/taskController");
const authController = require("./controllers/authController");

// parse body to json
app.use(express.json());
// handle encoded requests 
app.use(express.urlencoded({ extended: true }));
// parse cookies
app.use(cookieParser());

// serve static files
// this method set an automatic content-Type header under the hood, for add a custom header you can use setHeaders
// when a file is not found, it calls next() to move on to the next middleware, allowing for stacking and fall-backs
app.use("/", express.static(path.join(__dirname, "../assets")));

// serve the http://localhost:3333/ API listening to get requests and render the index page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

// serve the http://localhost:3333/signin API listening to post requests, then retrive the informatin sended from the submit method on the form (the destination API is defined in the action atribute)
// also verify the user and create a cookie to acess the next page
app.post('/signin', authController.verifyUser, authController.setCookie, (req, res) => {
  // check to see if the loging fail
  if (res.locals.error) {
    // if verification fail it send a string to the page
    res.status(400).send(`${res.locals.error}`)
  } else {
    // if verification pass, it server side router redirecting to secret page
    res.status(200).redirect('/secret');
  }
});

// verify the cookie, and serve the http://localhost:3333/secret API listening to get requests
app.get("/secret", authController.checkCookie, (req, res) => {
  // check to see if the cookie fail
  if (res.locals.error) {
    // if cookie fail it send a string to the page
    res.status(400).send(`${res.locals.error}`)
  } else {
    // if cookie pass it render the secret page
    res.sendFile(path.join(__dirname, "../views/secret.html"));
  }
});

// serve the http://localhost:3333/secret/task API listening to get requests, retrive the info from database and send as a response to the front-end
app.get('/secret/task', taskController.getTask, (req, res) => {
  res.status(200).json({...res.locals.data});
})

// serve the http://localhost:3333/secret/task API listening to post requests, retrive the info from front-end, save it to database and send as a response to the front-end with the id created by the database
app.post('/secret/task', taskController.postTask, (req, res) => {
  res.status(200).json({...res.locals.data});
})

// serve the http://localhost:3333/secret/task/:id API listening to delete requests, retrive the info from front-end, save it to database and send as a response to the front-end with the id created by the database
app.delete('/secret/task/:id', taskController.deleteTask, (req, res) => {
  res.status(200).json({...res.locals.data});
})

// serve all API in case of fail will catch all error-handler
app.use('*', (req, res)=> res.status(404).send('Page not found'));

// hadle errors that happend on the middleware printing a really specific message 
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown error',
    status: 400,
    message: { error: 'An error occurred: ' + err },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log("Server Error: ", errorObj.message);
  return res.status(errorObj.status).sendMessage('An error occurred');
});

// listen to the port 3333
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
