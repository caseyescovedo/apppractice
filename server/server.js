const express = require("express");
const path = require("path");
const PORT = 3333;
const taskController = require("../server/controllers/taskController");
const authController = require("../server/controllers/authController");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(express.static("assets"));

app.post("/signin", authController.newUser, (req, res) => {
  res.sendStatus(200);
});

app.get("/", (req, res, next) => {
  res.sendFile(path.resolve(__dirname, "../views/index.html"));
});

app.get("/styles.css", (req, res) => {
  res.set({
    "Content-Type": "text/css; charset=UTF-8"
  });
  res.status(200);
  res.sendFile(path.resolve(__dirname, "../views/styles.css"));
});

app.get("/secret", (req, res, next) => {
  res.sendFile(path.resolve(__dirname, "../views/secret.html"));
});

app.get("/toDo", taskController.getTasks, (req, res, next) => {
  res.status(200).json(res.locals.allTasks);
});

app.post("/toDo", taskController.postTask, (req, res) => {
  res.status(200).json(res.locals.allTasks);
});

app.listen(PORT, console.log(`connected on port ${PORT}`));
