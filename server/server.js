const express = require('express');

const app = express();
// const pool = require('./models');

const path = require('path');

// PORT number
const PORT = 3333;
const cors = require('cors');

// to prevent CORS issue
app.use(cors());
// to require all interactions to use/parse JSON
app.use(express.json());
// to handle form data correctly
app.use(express.urlencoded({ extended: true }));

// const router = require('./routes.js')
app.use(express.static('assets'));

const router = require('./routes');

app.use('/api', router);

app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'));
});

app.get('/secret', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'));
});

app.listen(PORT, () => {
  console.log(`Listening in on PORT ${PORT}`);
});
module.exports = app;
