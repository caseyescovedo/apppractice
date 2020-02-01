const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const taskRouter = require('../server/routes/taskRouter.js')

const PORT = 3333;

app.use(bodyParser.json());
app.use('/', express.static(path.resolve(__dirname, '../assets')));

app.get('/', function(req, res){
    res.status(200).sendFile(path.resolve(__dirname, "../views/index.html"));
});

app.get('/secret', function(req, res){
    res.cookie('token', 'admin');
    res.status(200).sendFile(path.resolve(__dirname, "../views/secret.html"));
});

app.use('/task', taskRouter);

app.listen(PORT, function(){
    console.log(`Listening on port: ${PORT}`);
});

app.use((err, req, res, next) => {
    console.log("Error: ", err);
    return res.status(400);
  });

module.exports = app;