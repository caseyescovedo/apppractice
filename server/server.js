const express = require('express');
const path = require('path');
const PORT = 3333;
const app = express();
const taskController = require('./controllers/taskController.js');



// app.get(express.static('../views'));
// app.get(express.static('../assets'));

// app.use(express.static(__dirname + "../assets"));

app.use(express.static(path.join(__dirname, "../assets")));


app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'))
})

app.get('/secret', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'))
})

app.post('/newtask', taskController.postTasks, (req, res) => {
  //console.log(req.body.item);
   res.send({"items" : res.locals.items});
})

app.get('/getTasks', taskController.getTasks, (req, res) => {
    res.json({'allTasks' : res.locals.tasks})
})

app.delete('/deleteTask', taskController.deleteTask, (req, res) => {
    
})



app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
 });

// app.use('/', (req, res) => {
//     console.log(Error)
//     throw new Error('BROKEN')
// })




app.listen(PORT, () => {
    console.log('Listening on port', PORT);
})