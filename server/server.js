const express = require('express');
const app = express();
const path = require('path');
const PORT = 3333;

app.use(express.static('assets'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.get('/secret', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/secret.html'));
});

app.get('*', (req, res) => {
  res.status(404);
});

app.use((err, req, res, next) => {
  res.status(500).send(`Error: ${err}`);
});

app.listen(PORT);
