const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const db = require('./controllers/taskController.js')
const app = express();
const PORT = 3333;
app.use(express.json()); 

//==============================ROUTES
app.get('/',db.getTask);            // get all tasks
app.post('/',db.postTask);          // post a task
app.delete('/:id',db.deleteTask);   // delete a task by id
//========================DEFAULT & STATIC 
// STATICS
app.use('/css', express.static(path.join(__dirname, '../assets/css'))); // CSS
app.use('/js', express.static(path.join(__dirname, '../assets/js')));   // JS

// DEFAULT
app.use('/secret', (req, res)=>{    //secret page
    res.sendFile(path.join(__dirname, '../views/secret.html')); 
  })
app.use('/', (req, res)=>{          //default page
  res.sendFile(path.join(__dirname, '../views/index.html')); 
})


//=======================GLOBAL ERROR HANDLER
app.use(function (err, req, res, next) {
    defaultErr = {
      log: 'Unknown Error at Global Error Handler',
      status: 400,
      message: { err: 'An error occurred' }, 
    }
    const errorObj = Object.assign(defaultErr, err); 
    console.log(errorObj.log);
    res.status(errorObj.status).json(errorObj.message);
  })


//===========================CONNECTION
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`)
  })
  