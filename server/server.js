const express = require('express');
const path = require('path');
const PORT = 3333;
const app = express();
const taskControl = require('./controllers/taskController.js');

//body parser;
app.use(express.json());

//serving the HTML and CSS
app.use(express.static('assets'));

//serving the HTML file that is in the Views folder; 
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../views/index.html'))
});

//serving up the css that is requesting from html
app.get('css/style.css', (req, res) => {
    res.set({'content-type': 'text/css; charset=UTF-8'})
    return res.status(200).sendFile(path.resolve(__dirname, './css/style.css'))
})

//serving the html secret html when you visit /secret 
app.get('/secret', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../views/secret.html'))
});

 //serving up the index.js that is being request by secret html
app.get('./js/index.js', (req, res) => {
    res.set({'content-type': 'text/html; charset=UTF-8'})
   return res.status(200).sendFile(path.resolve(__dirname, '../js/index.js'))
})

//creating a post route so we can add to the table. 
app.post('/secret', taskControl.postTask, (req, res) => {
    console.log('in post /secret')
    res.status(200).send('DONE')
})

//error handler
app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'express error handler caught unknown error',
        status: 400,
        message: { err: 'An error happened' }
    }
    const errObject = Object.assign(defaultErr, err);
    console.log(errObject);
    res.status(errObject.status).json(errObject.message)
});

//making sure our port is up and 
app.listen(PORT, ()=> {
    console.log('listening on port', PORT);
});
