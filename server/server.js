const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();
const authController = require("./controllers/authController");
const taskController = require("./controllers/taskController");

const PORT = 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

router.get("/tasks", taskController.getTasks, (req, res) => {
  res.send(200).json(res.locals);
});

router.post(
  "/tasks",
  taskController.postTask,
  taskController.getTasks,
  (req, res) => {
    res.send(200).json(res.locals);
  }
);

router.delete(
  "/tasks",
  taskController.deleteTask,
  taskController.getTasks,
  (req, res) => {
    res.send(200).json(res.locals);
  }
);

router.post("/", authController.setCookie, (req, res) => {
  res.sendfile(path.join(__dirname, "../views/secret.html"));
});

app.get("/secret", (req, res) => {
  res.sendfile(path.join(__dirname, "../views/secret.html"));
});

// app.use(express.static(path.resolve(__dirname, "../views/secret.html")));

app.use(express.static(path.resolve(__dirname, "../assets")));

app.use((req, res) => {
  res.send(404);
});

app.use((err, req, res, next) => {
  res.status(400).send("Error from global error handler");
});

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
