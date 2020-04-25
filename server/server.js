// require built-in libraries
const path = require('path');

// require external libraries (npm installed)
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

// importing files
const taskController = require('./controllers/taskController')
const authController = require('./controllers/authController')

// Create our App and establish our port
const app = express();
const PORT = 3333;

mongoose.connect(
  "mongodb+srv://jphong:codesmith01@cluster0-9tk0l.mongodb.net/test?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
)
  .then(() => console.log('Succesfully connected to the DB'))
  .catch((err) => console.log('your error: ', err))


// ==============================================================
// ====================== Middleware ============================
// ==============================================================
app.use(express.json());
app.use(cookieParser());

// ==============================================================
// ==================== Define Request ==========================
// ==============================================================

// Serve all html and css files
app.use('/assets', express.static(path.join(__dirname, '../assets')));

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
})

// Serve secret.html
app.get('/secret', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/secret.html'));
})

// ==============================================================
// ======================== Routers =============================
// ==============================================================
// can also be organized by creating a 'routes' folder and putting the below in as router

// retrieve all tasks
app.get('/tasks', taskController.getTasks, (req, res) => {
  res.status(200).json(res.locals.data);
})

// posts tasks
app.post('/tasks', taskController.postTask, (req, res) => {
  res.status(200).json(res.locals.data);
})

// delete tasks
app.get('/tasks/:id', taskController.deleteTask, (req, res) => {
  res.status(200).json({ message: `The following task has been deleted from the DB: ${req.params.id}` });
})


// ==============================================================
// ============ Errors Handlers for Middleware and Global =======
// ==============================================================

// Catch-all for unknown route requests
app.use('*', (req, res) => {
  res.sendStatus(404);
})

// Global Error Handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(defaultErr.status).json(errorObj.message);
});

// ==============================================================
// ================= Confirm Listening on Port ==================
// ==============================================================
app.listen(PORT, () => {
  console.log(`Captain, we are now listening on the following PORT: ${PORT} `);
})