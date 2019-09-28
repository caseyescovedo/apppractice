const express = require('express');
const app = express(); // preparing express for use
const bodyParser = require('body-parser'); // may need
const path = require('path'); // may need
const PORT = 3333 // PORT 3333 as requested

app.use('/views', express.static(path.resolve(__dirname, '../views/')));
app.use('/css', express.static(path.resolve(__dirname, '../assets/css')));
app.use('/js', express.static(path.resolve(__dirname, '../assets/js')));


app.get('/', function (req, res) {
  res.status(200);
  res.sendFile(path.resolve(__dirname, '../views/index.html'));
})

app.get('/secret', function (req, res) {
  res.status(200);
  res.sendFile(path.resolve(__dirname, '../views/secret.html'));
})

app.listen(PORT, () => console.log(`server listening on port ${PORT}`));