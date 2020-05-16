const express = require("express");
const path = require("path");
const app = express();
const port = 3333;
const bodyParser = require("body-parser");
const taskController = require("./controllers/taskController.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/addTask", taskController.postTask, (req, res) =>
  res.sendFile(path.resolve(__dirname, "../views/secret.html"))
);
app.get("/getTasks", taskController.getTasks, (req, res) =>
  res.sendFile(path.resolve(__dirname, "../views/secret.html"))
);
app.get("/secret", (req, res) =>
  res.sendFile(path.resolve(__dirname, "../views/secret.html"))
);
app.get("/styles.css", (req, res) => {
  res
    .set("Content-Type", "styles/css")
    .sendFile(path.resolve(__dirname, "../assets/css/style.css"));
});
app.get("/index.js", (req, res) => {
  res
    .set("Content-Type", "text/js")
    .sendFile(path.resolve(__dirname, "../assets/js/index.js"));
});

app.get("/", (req, res) =>
  res.sendFile(path.resolve(__dirname, "../views/index.html"))
);
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
