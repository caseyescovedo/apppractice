const express = require('express');

const app = express();

const router = require('./routes.js');

const PORT = 3333;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static('views'));
app.use(express.static('assets'));
app.use('/secret', express.static('views/secret.html'));

app.use('/api', router);

app.use('/', (err, req, res, next) => {
  console.log(err);
});

app.listen(PORT, () => {
  console.log('we are listening on port: ', PORT);
});
