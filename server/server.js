const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const formData = require('express-form-data')

const PORT = 3333;
const app = express();

const authController = require('./controllers/authController');

app.use(formData.parse())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Requests from Client

// First GET route to render index.html to the page
app.get('/', (req, res) =>{
  res.status(200).sendFile(path.join(__dirname, '../views/index.html'));
});

// Retrieving Styling from css file

app.get('/signin', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../assets/styles.css'));
})

// This is a GET route so when users sign in they are directed to /secrets and secret.html is rendered
app.post('/signin', authController.getUser, (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'))
})

//Error Handlers/Catchers

app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Internal Server Error');
});
 
// Port
app.listen(PORT, () => {console.log(`Listening on port: ${PORT}`)} );

/* So basically I understand what I need to do but I'm having so much trouble with my DB.
I'm writing this at about 3:00 and I'm just lost as to how proceed when I have my DB connected
haha but I keep having to create new tables because I still don't fully understand PostgreSQL syntax. 
Ultimately, I know that this assessment is a learning opportunity so I just have to grow from 
it. I feel like my understanding of the backend has improved tremendously and my understanding of
the frontend(specifically React) has improved and I'm proud of that. The concept of the data flow
and structuring my application(boilerplate) makes sense to me but I just don't know how I'm supposed
to commit the syntax and methodology of applying certain technologies, etc. is supposed to be done
effectively. Ha and sorry I know this is long but I usually try not to bother anyone with my coding
questions because I know everyone here is very busy so I hope that someone will take the time to read
this. Other than that I'm just worried about this whole process in general but I know that things
will improve if I put in more effort. Also when it comes to DOM manipulation with Vanilla JS I've 
forgotten a lot.
*/