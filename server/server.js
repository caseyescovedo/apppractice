const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// PORT
const PORT = 3333;
const app = express();

app.use(bodyParser.urlencoded({ extended: true })); // parse url encoded
app.use(bodyParser.json()); // parse application json
app.use(cookieParser());
app.use(express.static('views')); // serve views directory

app.get('/', (req, res) => {
  console.log('path to login', path.resolve(__dirname, '../views/index.html'));
  res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'));
});
// start server
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
