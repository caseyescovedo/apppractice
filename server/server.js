const express = require("express");
const app = express();
const port = 3333;
const path = require("path");
const taskController = require("./controllers/taskController");
const authController = require("./controllers/authController.js");

app.use(express.json());
app.use(express.static("assets"));

// app.use("/", (req, res) =>
//   res.sendFile(path.join(__dirname, "../assets/css/style.css"))
// );

app.get("/tasks", taskController.getTasks);
app.post("/tasks", taskController.postTasks, authController.cookiePosting);
app.delete("/tasks/:id", taskController.deleteTasks);

app.use("/secret", (req, res) =>
  res.sendFile(path.join(__dirname, "../views", "secret.html"))
);

app.use("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../views", "index.html"))
);
app.listen(port, () => console.log(`Listening on ${port}`));

module.exports = app;
