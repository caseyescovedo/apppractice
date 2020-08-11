const express = require('express');
const path = require('path');
const app = express();
const taskController = require('./controllers/taskController.js')
const authController = require('./controllers/authController.js')
app.use(express.json());
app.use(express.static(path.join(__dirname, '../views/')))
app.use(express.static(path.join(__dirname, '../assets/')))


app.get('/', (req,res) => {
    res.status(200).sendFile('../views/index.html');
})

app.post('/signin', authController.verifyUser, authController.setCookie, (req, res) => {
      return res.redirect('/secret');
    }
  );

//omgggah why dont you work D= :'(  
//had weird syntax problem/need absolute path error here, but got it to work finally!
app.get('/secret', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../views/secret.html'));
  });

app.get('/getTasks', taskController.getTasks, (req,res) => {
    return res.status(200).json({messages: res.locals.tasks});
})

app.post('/postTasks', taskController.postTask, (req,res) => {
    return res.status(200).json({ success: 'successfully added task'})
})

app.delete('/deleteTask/:id', taskController.deleteTask, (req,res) => {
    return res.status(200).json({success: 'succesfully deleted task'})
})


//for paths that dont exist
app.use('*', (req, res) => {
    return res.status(404).json(`Page Doesn't Exist`);
});

//global error handler
app.use(function (err, req, res, next) {
    console.log(err.status, err.log)
    return res.status(err.status).send(err.log)
  })

app.listen(3333, ()=> {
    console.log('yo we listening and we are here part 2!')
})