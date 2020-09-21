const express = require('express');
const app = express();
const port = 3333;
const controller = require('../server/controllers/taskController');
const cors = require('cors');
// const bodyParser = require('body-parser')

// app.use(bodyParser.urlencoded({
//   extended: true
// }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('views'));
app.use(express.static('assets'));
app.use('/secret', express.static('views/secret.html'));

app.get('/secrets/get', controller.getTasks, (req, res) => {
  res.status(200).json(res.locals.get);
});

app.post('/secrets/post', controller.postTask, (req, res) => {
  res.status(200).json(res.locals.get);
});

app.post('/secrets/delete', controller.deleteTask, (req, res) => {
  res.status(200).json(res.locals.get);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
