const express = require('express')
const app = express()
const port = 3333
const path = require('path')
const taskController = require('./controllers/taskController')
const authController = require('./controllers/authController')

//Site can add, get and delete
//removed authController since it wasn't working


//DONT FORGET ABOUT THIS LINE!!!!!!! req.body WIll not read without it!!!
app.use(express.json())

//used to serve everything in the assets folder
app.use(express.static('assets'))
//says that headers should be set... return back to this for CSS and JS
app.use(express.static('views'))
// app.use('/', authController.login, (req,res)=> {
//     res.redirect(path.join(__dirname, '../views/secret.html'))
// })
// app.use('/', authController.login, express.static(path.join(__dirname, '../views/index.html')))

app.use('/secret', express.static(path.join(__dirname, '../views/secret.html')))

app.get('/getTask', taskController.getTask, (req, res) => {
    res.status(200).json(res.locals.tasks)
    //sending back all the tasks
})

app.delete('/deleteTask', taskController.deleteTask, (req,res) => {
    res.status(200).json(res.locals.deleted)
})

app.post( '/addTask', taskController.addTask, (req,res)=> {
    res.status(200).json(res.locals.tasks)
}

)

app.listen(port, ()=> {
    console.log(`Connected to port ${port}!!!!!!!`)
})