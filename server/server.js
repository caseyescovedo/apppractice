const express = require('express');

const app = express();
const path = require('path');
const PORT = 3333;

app.use(express.static(path.resolve(__dirname, '../assets')));

app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'));
});

app.get('/secret', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'));
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}...`));
