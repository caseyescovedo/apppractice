const express = require('express');
const app = express();
const PORT = 3333;
const bodyparser = require('body-parser');
const path = require('path');
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController')
const cookieParser = require('cookie-parser')



app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended : false }))
app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, '../assets')));
app.use('/', express.static(path.join(__dirname, '../views')));
app.use('/secret', express.static(path.join(__dirname, '../views/secret.html')));

//was unable to get the cookie checker to work properly, was able to get the cookie info properly but wasnt able to get the file to serve the right way after verifying so served it statically when submitting. authController has some of the logic written out there but couldn't figure out how to get the index.js file to render AFTER approving the cookie.
//Also ran out of time before ensuring that it would not create duplicates.

app.get('/getTasks', taskController.getTasks, (req, res) => {
    console.log('Get Task Router');
    res.status(200).json(res.locals.task);
});

app.post('/newTask', taskController.postTask, (req, res) => {
    console.log('Post Task Router');
    res.status(200).json(res.locals.task);
});

app.delete('/deleteTask/:id', taskController.deleteTask, (req, res) => {
    console.log('Delete Task Router');
    res.status(200).json();
})

app.post('/signin', authController.loginCheck, (req, res) => {
    console.log(req.body)
    res.status(200).json();
})


app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))