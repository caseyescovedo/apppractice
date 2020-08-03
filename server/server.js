const express = require('express');
const app = express();
const path = require('path');
var cookieParser = require('cookie-parser')
const {
  postTask,
  deleteTask,
  getTasks,
} = require('./controllers/taskController');


const {
  signin
} = require("./controllers/authController");

PORT = process.env.PORT || 3333;

app.use(cookieParser());
// console.log(path.resolve(__dirname, '../views'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// app.use(express.static(path.resolve(__dirname, '../views'), {extensions:['html']}))
app.use(
  express.static(path.resolve(__dirname, "../assets"), { extensions: ["html", "css"] })
);

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../views/index.html"));
})

app.get('/secret', (req, res) => {
  if (req.cookies.token !== 'admin'){
    res.status(404).json('Unauthorized');
  } else {
    res.status(200).sendFile(path.resolve(__dirname, "../views/secret.html"));
  }
})

app.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT}`);
})

app.post("/tasks", postTask, (req, res) => {
  //If you get here, that means you are successfully 
  //create a task, send back the body for easy testing
  res.json(res.locals.newTask);
});

app.get("/tasks", getTasks, (req, res) => {
  //If you get here, that means you are successfully
  //create a task, send back the body for easy testing
  res.json(res.locals.allTasks);
});

app.post("/signin", signin, (req, res) => {
  //If you get here, that means you are successfully
  //create a task, send back the body for easy testing
  res.status(200).sendFile(path.resolve(__dirname, "../views/secret.html"));
});

app.delete("/tasks/:item_id", deleteTask, (req, res) => {
  //If you get here, that means you are successfully
  //create a task, send back the body for easy testing
  res.json('Deleted successfully');
});

/**
 *  This is a global errors handle
 */

app.use(function (err, req, res, next){
  // If have time, add a default err and use Object assign 
  // to make the error more readable.
  console.log('This is global error handler', err);
  res.status(500).json({erros: err})
})