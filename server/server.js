const express = require("express");
const app = express();
const path = require("path");
const PORT = 3333;
const taskController = require("./controllers/taskController.js");

//server static file /views/index.html
app.use(express.static(path.join(__dirname, "../views")));
//visit http://localhost:3333/secret in the browser, you should render the secret.html file from the views folder
app.get("/secret", (req, res) => {
  const options = {
    headers: {
      "content-type": "text/html",
    },
  };
  res
    .status(200)
    .sendFile(path.join(__dirname, "../views/secret.html"), options);
});
//serve css
app.get("/css/style.css", (req, res) => {
  const options = {
    headers: {
      "content-type": "text/css",
    },
  };
  res
    .status(200)
    .sendFile(path.join(__dirname, "../assets/css/style.css"), options);
});
//serve js
app.get("/js/index.js", (req, res) => {
  const options = {
    headers: {
      "content-type": "text/js",
    },
  };
  res
    .status(200)
    .sendFile(path.join(__dirname, "../assets/js/index.js"), options);
});

//route to Function postTask should create a new item in the database
app.post(
  "/postTask",
  taskController.postTask,
  taskController.getTask,
  (req, res) => {
    res.status(200).json(res.locals.data);
  }
);

//route to Function getTasks should retrieve all items from the database and send it back to the client as JSON
app.get("/getTask", taskController.getTask, (req, res) => {
  res.status(200).json(res.locals.data);
});

//route to Function deleteTask should find items in the database based on an ID number and delete that item if it exists
app.delete(
  "/deleteTask",
  taskController.deleteTask,
  taskController.getTask,
  (req, res) => {
    res.status(200).json(res.locals.data);
  }
);

// handle unknown path
app.use((req, res) => {
  res.status(404).send("Not Found");
});

//error handler
app.use((err, req, res, next) => {
  res.status(400).send(err);
});

app.listen(PORT, () => console.log("listening on port 3333"));
module.exports = app;
