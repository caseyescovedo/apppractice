//require dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const taskController = require('../server/controllers/taskController');

//allows access to the app
const app = express();

const PORT = 3333;

//parses through the request body that is sent from the client
app.use(bodyParser.json());
//parses through nested objects in the request body
app.use(bodyParser.urlencoded({ extended: true }));
//statically serves the CSS and JS files that are required from the HTML files
app.use('/assets', express.static(path.join(__dirname, '../assets')));
//serves the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});
//serves the secret.html file
app.get('/secret', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/secret.html'));
});
//post the tasks
app.post('/items', taskController.postTask, (req, res) => {
  res.status(200).send(res.locals.item);
});
//get the task
app.get('/items', taskController.getTask, (req, res) => {
  res.status(200).json(res.locals.item);
});
//deletes the task
app.delete('/items', taskController.deleteTask, (req, res) => {
  res.status(200);
});

//connects app to port
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
