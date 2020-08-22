const express = require('express');
const app = express();
const path = require("path")
const cookieParser = require('cookie-parser');
const authController = require("./controllers/authController")
const taskController = require("./controllers/taskController")

const PORT = 3333;

// GLOCAL MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => res.sendFile(path.resolve(__dirname, '../views/index.html')));

app.get("/secret",
  authController.checkCookie,
  (req, res) => res.sendFile(path.resolve(__dirname, '../views/secret.html')));

app.use(express.static('assets'));

app.post("/signin",
  authController.checkLogin,
  (req, res) => res.redirect("/secret")
)

/***********************************************************
 ****************   TASK ROUTES   **************************
 ***********************************************************/
app.get("/tasks",
  taskController.getTasks,
  (req, res) => res.status(200).json(res.locals.tasks)
)

app.post("/tasks",
  taskController.postTask,
  (req, res) => res.status(200).json(res.locals.newTask)
)

app.delete("/tasks/:id",
  taskController.deleteTask,
  (req, res) => res.status(200).json({})
)

/***********************************************************
 ****************   ERROR HANDLING  ************************
 ***********************************************************/

// UNKOWN URL
app.use('*', (req, res) => {
  res.status(404).send('URL path not found');
});

//ERROR HANDLER
app.use("/", (err, req, res, next) => {
  res.status(401).send(err.message);
})

app.listen(PORT, () => console.log("Listening on PORT ", PORT))