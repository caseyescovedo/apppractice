const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const taskController = require('./controllers/taskController');

const app = express();
app.use(bodyParser.json());
const PORT = 3333;

app.use('/assets', express.static(path.join(__dirname, '../assets')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.get('/secret', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../views/secret.html'));
});

app.post('/secret', taskController.postTrack, (req, res, next) => {
  res.sendStatus(200);
});

app.get('/api/secret', taskController.getItems, (req, res, next) => {
  res.status(200).json(res.locals.foundItems);
});

app.delete('/secret/:id', taskController.deleteItem, (req, res, next) => {
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`listening on {PORT}`);
});
