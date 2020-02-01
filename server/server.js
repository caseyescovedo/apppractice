const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const PORT = 3333;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/assets', express.static(path.join(__dirname, '../assets')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.get('/secret', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/secret.html'));
});

app.post('/', (req, res) => {
  res.send('Got a POST request');
});

app.put('/user', (req, res) => {
  res.send('Got a PUT request at /user');
});

app.delete('/user', (req, res) => {
  res.send('Got a DELETE request at /user');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!')
})

app.listen(PORT, () => console.log(`To-Do list app listening to port ${PORT}`));
