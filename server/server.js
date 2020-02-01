const express = require('express');
const path = require('path');
const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../', 'views', 'index.html'));
});

app.get('/secret', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../', 'views', 'secret.html'));
});

app.use(express.static(path.resolve(__dirname, '../', 'assets')));

app.listen(3333);
