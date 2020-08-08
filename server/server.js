const express = require ("express");
const path = require ("path");
const app = express ();
const taskController = require("./controllers/taskController.js")

app.use(express.json());

app.use(express.static(path.join(__dirname, "../views/index.html")));
app.use(express.static(path.join(__dirname, "../assets/")));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, "../views/secret.html"));
});

app.get('/todo', taskController.getTasks, ( req, res) => {
  return res.status(200).json({ tasks: res.locals.tasks});
});

app.post('/todo', taskController.postTask, (req, res) => {
  return res.status(200).end();
})

app.delete('/todo/:id', taskController.deleteTask, (req, res) => {
  return res.status(200).end();
});

app.listen(3333, () => {
  console.log("Cyn it's working!")
});