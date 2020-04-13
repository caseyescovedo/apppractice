const express = require("express");
const app = express();
const path = require("path");

const PORT = 3333;
app.use(express.json());

const taskController = require("./controllers/taskController");

app.use("/", express.static(path.join(__dirname, "../assets")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

app.get("/secret", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/secret.html"));
});

// realized far too late that I was trying to serve the html file.... ran out of time
app.get("/task", (req, res) => {
  res.status(200).json(res.locals.task);
  // console.log(res.locals)
});
app.post(
  "/delete",
  // authController.checkCookie,
  taskController.deleteTasks,
  (req, res) => {
    res.status(200).json(res.locals.bool);
  }
);

app.post(
  "/",
  taskController.postTasks,
  // authController.setCookie,
  (req, res) => {
    res.status(200).json(res.locals.newTask);
  }
);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});
