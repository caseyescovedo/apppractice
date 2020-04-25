const express = require ('express')
const app = express(); 
const path = require('path')
const port = 3333; 
const taskController = require ('./controllers/taskController.js')
const authController = require ('./controllers/authController.js')
const bodyParser = require('body-parser')


app.use(bodyParser.json())
// on initial load serve to the root serve static html file 
app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname,'../views/index.html'))
})

// upon initial load to root also serve the js and css located in assets 
app.use('/', express.static(path.join(__dirname, '../assets')))
// on initial load serve to the /secret serve static html file 
app.use('/secret' , express.static(path.join(__dirname,'../views/secret.html','')))


// Crud routes , no router folder in the directory so putting routes directly in server as there are only three 

app.get('/getTasks',taskController.getTasks, (req,res) =>{
    res.json(res.locals.items)

})

app.post('/postTask',taskController.postTask, (req,res) =>{
    res.sendStatus(200)
})

app.delete('/deleteTask/:id',taskController.deleteTask, (req,res) =>{
    res.sendStatus(200)
})

// catch all route error handler , any route req that is not listed above will get this error 
app.get('*', (req,res)=>{
    res.sendStatus(404)
})

// global error hanlder for any server side errors 
app.use((err,req,res,next )=>{
    console.log(err)
    res.status(500).send('Internal Server error')
})

app.listen(port, ()=> console.log(` Your server is running on port ${port} !`))

