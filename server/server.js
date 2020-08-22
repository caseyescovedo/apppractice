var express = require('express');
var app = express();
var path = require('path');
console.log('server.js');

/* 
  NOTE: In the ReadMe, it says to redirect to the secret page when the sign in is submitted.
  It seems like it's expecting us to do this without Javascript since index.html is not serving javascript.
  How is this possible to re-route on a button click without Javascript?
  Skipping this step due to time constraint

  I got to the sign in part but had to stop working due to time. I'm rusty on authentication anyway. authController is probably messy
*/

const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

app.use(express.json());

app.use(express.static(path.join(__dirname, '../views' ))); // servers index.html
app.use(express.static(path.join(__dirname, '../assets' ))); // serves assets

// route to secret
app.get('/secret', (req,res) => {
  res.status(200).sendFile(path.join(__dirname, '../views/secret.html'))
});

// postTask - expects a req.body
app.post('/tasks', 
  taskController.postTask,
  (req,res) => res.status(200).send('postTask finished executing')
);
// getTasks
app.get('/tasks', 
  taskController.getTasks,
  (req,res) => {
    res.status(200)
      .json(res.locals.tasks)
});
// deleteTask - expects a req.params.id
app.delete('/tasks/:id', 
  taskController.deleteTask,
  (req,res) => res.status(200).send('deleteTask finished executing')
);

// SIGN IN ROUTE
app.get('/signin',
  authController.signIn,
  (req, res) => res.status(200).send('signin finished executing')
)


app.listen(3333); // listens on port 3333