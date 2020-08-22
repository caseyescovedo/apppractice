const express = require('express');
const app = express();
const port = 3333;
const path = require('path');
const taskController = require('./controllers/taskController.js')
const authController = require('./controllers/authController.js')
//const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
/////confused by the Task model page, placing this here for my testing purposes w/ postman
// const DB_URI = 'mongodb+srv://codesmith123:bonjay123@assessment.da6rd.mongodb.net/assessmentDB?retryWrites=true&w=majority';
// //lets mongoose know where the DB api is
// mongoose.connect(DB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// //connecting to DB
// mongoose.connection.once('open', () => {
//   console.log('Connected to database.');
// });


app.use(express.json()); //parse json data
app.use(express.static('views')); //serve the views directory
app.use(express.static('assets')); //serve the assets directory. 
//error: Refused to apply style from 'http://localhost:3333/css/style.css' because its MIME type ('text/html') is not a supported stylesheet MIME type, and strict MIME checking is enabled.
//app.use('/secret', express.static('../views/secret.html')) //does not work. No default engine or extension specificed error

//serve the css with any request
// app.get('/', (req, res) => {
//     res.status(200)
//         .set({ "content-type": "text/css" })
//         .sendFile(path.resolve(__dirname, './assets/css/styles.css'));
// }); 

// //serve the js with any request
// app.get('/', (req, res) => {
//     res.status(200)
//         .set({ "content-type": "application/json" })
//         .sendFile(path.resolve(__dirname, './assets/js/index.js'));
// });

app.use(cookieParser()); //parse those cookies!
//create a route to secret end point
app.get('/secret', (req, res) => {
   //check if the token key on cookies has the value of admin
    if (req.cookies.token === 'admin'){ //at this point I've drained all my mental stamina and I bet none of this works. 
        res.render(path.join(__dirname, '../views/secret.html'));  //error of no default engine specified to view page... (prior to the auth section btw)
    } else {
        res.json('You must be signed in to view this page');

    }
    

});

//create a route for the data request. Express works line by line... I assume I can give these separate endpoints so as not to interfere with the rendering of /secret w/ get requests.
app.get('/task', taskController.getTask, (req, res) => {
    res.status(200)
    .set('Content-type', 'application/json')
    .json(res.locals.task);
});

//route for creating a task
app.post('/task', taskController.postTask, (req, res) => {
    res.status(200)
    .set('Content-type', 'application/json')
    .json(res.locals.task);
});

//create a route for deleting a task. 
app.delete('/task', taskController.deleteTask, (req, res) => {
    res.status(200)
    .set('Content-type', 'application/json')
    .json('Successfully deleted');
});

//create a route to handle the signin action from index.html

app.post('/signin', authController.cookieController, (req, res) => {
    res.status(200).render('./../views/secret')
})
//express universal error handler

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    console.log('There was an error', err);
    const errorStatus = err.status || 500;
    return res.status(errorStatus)
    .set('Content-type', 'application/json')
    .send(res.locals.message);
  });
  

//listening for port 3333!
app.listen(port, () => console.log(`Listening on port ${port}`));