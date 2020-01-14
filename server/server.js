const express = require('express'); 
const app = express();
const path = require('path');
const PORT = 3333; 
const task = require('./controllers/taskController.js');

app.use(express.json()); 


/* I'm getting an error that is telling me I can't set headers after they are sent to the client, so I
tried to set the headers in different formats, but it wasn't working.
In my console of my secret page, there is also an error telling me that it is not getting my index.js file 
(the error is occuring in the html file for my script tag) */

//UPDATE: I wasn't able to fix this error, but I did have the response from my query show up in the terminal for a hot minute 
//before it stopped working again. So I just decided to move on and do the parts that I can even though I'm not able to run it


//me trying to set headers
// app.get('/css', (req, res) => {
//   res.set('content-type: text/css; charset=UTF-8')
//   res.status(200).send(fs.readFileSync('../assets/css/style.css')); 
// })
// app.get('/assets/js/index.js', (req, res)=>{
//   res.set('Content-Type: application/json; charset=utf-8; ');
//   res.status(200).send(fs.readFileSync('../assets/js/index.js'))
// })
// app.use('/assets', express.static(path.join(__dirname, '../assets'), {
//   setHeaders: function(res, path){
//     res.set('Content-Type: application/json; charset=utf-8;');
//     res.set('Content-Type: text/css; charset=utf-8');
//   }
// }));

//handle the static files in the assets folder
app.use('/assets', express.static(path.join(__dirname, '../assets')));

//post request to create task 
app.post('/create', task.createTask, (req, res) =>{
  res.status(200).json(res.locals.create);
})

//get request to get the list of all tasks 
app.get('/list', task.getItems, (req, res) =>{
  res.status(200).json(res.locals.list);
})

app.delete('/delete', task.deleteItems, (req, res) => {
  res.status(200).json(res.locals.delete);
})

//to render the secret page 
app.get('/secret', (req, res)=>{
  res.sendFile(path.join(__dirname, '../views/secret.html'));
})

//to get the html page to show up 
app.get('/',  (req, res)=>{
  res.sendFile(path.join(__dirname, '../views/index.html')); 
})

// //handle the static files in the assets folder
// app.use('/assets', express.static(path.join(__dirname, '../assets')));


//global error handler
app.use(function (err, req, res, next) {
  defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' }, 
  }
  const errorObj = Object.assign(defaultErr, err); 
  console.log(errorObj.log);
  res.status(errorObj.status).json(errorObj.message);
})

app.listen(PORT, ()=>{
  console.log(`Listening on port ${PORT}`);
})

module.exports = app;