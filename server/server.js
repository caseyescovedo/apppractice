// require in dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const taskController = require('./controllers/taskController');

const path = require('path');

// initialize express in the application
const app = express();

// Set up your server to use bodyParser and cookieParser
app.use(bodyParser.json());
app.use(cookieParser());

// *** (this is the Login page) ***
// Serve the index.html page to the '/' route using path.join *** (this is the Login page) ***
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

//*** (this is the actual Todo page) ***
// Serve the secret.html page when visiting the '/secret' route using path.join ()
app.get('/secret', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/secret.html'));
});

// Serve css to both / and /secret, also serve index.js to /secret
// might need to come back to this part, for some reason I can't get it to work, but think that there are more important parts
// This seems to work, but I may need to come back to this to use more specific headers like below (couldnt get them to work properly)
// Below are the other things that I tried. I remember setting headers based on the file type in one of the assessments
app.use(express.static('assets'));

// app.get('/', (req, res) => {
//   // come back to this
//   res
//     .status(200)
//     .set('Content-Type: text/css; charset=UTF-8')
//     .sendFile(path.join(__dirname, '../assets/css/style.css'));
// });

// app.get('/secret', (req, res) => {
//   // come back to this
//   res
//     .status(200)
//     .set('Content-Type: text/javascript; charset=UTF-8')
//     .sendFile(path.join(__dirname, '../assets/js/index.js'));
// });

// app.get('/secret', (req, res) => {
//   // come back to this
//   res
//     .status(200)
//     .set('Content-Type: text/css; charset=UTF-8')
//     .sendFile(path.join(__dirname, '../assets/css/style.css'));
// });

// This is where I will pull in my middleware and serve response from database to the frontend of my application

// app.post /secret/tasks, middleware,
// send using res.status(200).json(put what you stored in res.locals here)

//
app.post('/secret/tasks', taskController.postTask, (req, res) => {
  res.status(200).json(res.locals.task);
});

// app.get /secret, middleware
// send using res.status(200).json(put what you stored in res.locals here)
app.get('/secret/tasks', taskController.getTasks, (req, res) => {
  res.status(200).json(res.locals.tasks);
});

app.delete('/secret/tasks/:id', taskController.deleteTask, (req, res) => {
  res.status(200).json(res.locals.removed);
});

// Initialize a PORT to listen and then initialize server to listen on this port using app.listen
const PORT = 3333;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
