const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db').start();

const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`Listening on ${port}`));
