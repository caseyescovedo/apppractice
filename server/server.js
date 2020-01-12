const express = require("express");
const path = require("path");
const PORT = 3333;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const taskController = require("./controllers/taskController");
const authController = require("./controllers/authController");

const app = express();

// use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use cookie parser
app.use(cookieParser());

// serve static assets
app.use("/assets", express.static(path.join(__dirname, "../assets")));

// get request to serve up html files
app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../views/index.html"));
});

app.get("/secret", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../views/secret.html"));
});

// route to get tasks
app.get(
  "/secret",
  authController.setCookie,
  taskController.getTasks,
  (req, res) => {
    res.status(200).json(res.locals.items);
  }
);

// route to add task
app.post("/secret", taskController.postTask, (req, res) => {
  res.status(200).json(res.locals.item);
});

// route to delete task
app.delete("/secret/:_id", taskController.deleteTask, (req, res) => {
  res.status(200).json(res.locals.item);
});

// catch-all error
app.use("*", (req, res) => {
  res.sendStatus(404);
});

// Global error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.sendStatus(418);
});

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
