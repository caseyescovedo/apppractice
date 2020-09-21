const express = require('express');
const app = express();
const pool = require('./models/TaskModel');
const path = require('path');
const routes = require('./routes.js')

// PORT number 
const PORT = 3333;
const cors = require('cors');

// prevents possible cors error 
app.use(cors());
// serving up static file 
app.use(express.static('views'));
app.use('/', express.static('assets'));
// require all interactions to use/parse JSON
app.get('/secret', (req,res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'))
})
app.use('/secret', express.static('assets'));
app.use(express.json());
// handle form data correctly
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);
//error handler 
app.use('/', (err, req, res, next) => {
  console.log(err);
});


app.listen(PORT, () => {
  console.log('listening on 3333');
});
 
module.exports = app;