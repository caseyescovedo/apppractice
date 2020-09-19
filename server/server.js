const express = require('express');
const app = express();
const port = 3333;
const path = require('path');
const router = require('./routes/route.js')

app.use(cors());

// handle all json 
app.use(express.json());

// url encoded true 
app.use(express.urlencoded({extended: true}));

// render our html pages 
app.use(express.static('views'));

app.get('/secret', (req, res) => {
    res.status(200).sendFile(path.resolve('./views/secret.html'))
});

// use router to deal with all fetch requests 
app.use('/api', router);

// app.post 

// app.put 

// app.delete 

app.use('/', (err, req, res, next) => {
    console.log(err);
});

app.listen(port, ()=> console.log('Totally listening on port 3333'));

module.exports = app;