const express = require('express');
const app = express();
const path = require('path');
const PORT = 3333;


app.use(express.static(path.join(__dirname, '../assets')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
})

app.get('/secret', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/secret.html'));
})

app.use('*', (req, res) => {
  res.sendStatus(404);
})

app.use((err, req, res, next) => {
  console.log(`UNCAUGHT MIDDLEWARE ERROR: ${err}`);
})

app.listen(PORT, () => console.log(`listening on port ${PORT}...`));
