const express = require("express");
const path = require("path");
const taskController = require("./controllers/taskController.js");

const app = express();
const PORT = 3333;

app.use(express.json());

app.use(express.static("./assets"));

app.get("/secret", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/secret.html"));
});

app.post("/tasks", taskController.postTask, (req, res) => {
  res.status(200).json(res.locals);
});

app.post("/delete", taskController.deleteTask, (req, res) => {
  res.status(200);
});

app.get("/tasks", taskController.getTasks, (req, res) => {
  res.status(200).json(res.locals);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

app.listen(PORT, () => {
  console.log("app listening on port ", PORT);
});
