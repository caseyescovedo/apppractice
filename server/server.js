const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const taskController = require('./controllers/taskController.js')

//app.use(cors())
app.use(express.json()); //allow us to access the req.body
app.use(express.urlencoded( {extended: true }));

app.use(express.static(path.join(__dirname, '../views/'))); // auto serves views files
app.use(express.static(path.join(__dirname, '../assets/'))); // auto serves assests files


app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/index.html')); // we specify which file to serve
})
app.get('/secret', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html')); // we specify which file to serve
  })

// Get Task
app.get('/getTask', taskController.getTask, (req, res) =>{
    return res.status(200).json({success: res.locals.tasks})
})

//Post Task
app.post('/postTask', taskController.postTask, (req, res) => {
    return res.status(200).json({ success: posted })
})

//Delete Task
app.delete('/deleteTask/:id', taskController.deleteTask, (req, res) => {
    return res.status(200).json({success: deleted })
})

//for paths doesnt exist
app.use('*', (req, res) => {
    res.status(404).json(`Page doessn't exist`)
})

//global error handler
app.use(function (err, req, res, next) {
    console.log(err.status, err.log)
    return res.status(err.status).send(err.log)
})


app.listen(3333, () => {
    console.log('server starting 3333');
}); //listens on port 3333 -> http://localhost:3333/