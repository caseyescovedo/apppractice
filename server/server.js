const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const PORT = 3333;

app.use(express.static('assets'));

app.get('/', (req, res) => {
  res.sendFile(
    path.join(__dirname, '../views/index.html'),
    {
      headers: { 'Content-Type': 'text/html; charset=UTF-8' },
    },
    (err) => {
      if (err) console.log(err);
      else console.log(`file sent!`);
    }
  );
});

app.get('/secret', (req, res) => {
  res.sendFile(
    path.join(__dirname, '../views/secret.html'),
    {
      headers: { 'Content-Type': 'text/html; charset=UTF-8' },
    },
    (err) => {
      if (err) console.log(err);
      else console.log(`file sent!`);
    }
  );
});

function getFiles(name) {
  const options = {
    root: path.join(__dirname, 'public'),
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true,
    },
  };
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
