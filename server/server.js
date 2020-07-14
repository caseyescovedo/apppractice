const express = require('express');
const app = express();
require('dotenv').config();

require('./startup/logging')();
require('./startup/requestParse')(app);
require('./startup/routes')(app);
require('./startup/db').start();

const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`Listening on ${port}`));
