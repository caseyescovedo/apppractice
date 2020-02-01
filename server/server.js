const express = require('express');

const app = express();

const PORT = 3333;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(PORT, () => console.log(`To-Do list app listening to port ${PORT}`));
