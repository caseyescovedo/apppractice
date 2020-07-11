const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();

const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`Listening on ${port}`));
