const express = require('express');
const app = express();
const path = require('path');
const taskRouter = require('./Routers/taskRouter.js');
const authController = require('./controllers/authController.js');


const PORT = 3333;

// ************* Serve Static assets and parse requests ************* // 
app.use('/assets', express.static(path.join(__dirname, '../assets')));
app.use(express.json());
app.use(express.urlencoded());

// ************* Routes ************* // 
app.use('/secret/task', taskRouter);

app.post('/signin', authController.verifyUser, (req, res) => {
    res.redirect('/secret')
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.get('/secret', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/secret.html'));
});

// ************* Set up error handlers ************* // 
app.use('*', (req, res) => {
    res.sendStatus(404);
});

app.use((err, req, res, next) => {
    console.log(err);
    res.sendStatus(404).json({err: 'There was an error processing your request'});
});

// ************* Confirm listening on Port ************* // 
app.listen(PORT, () => console.log(`Tuning in on PORT => ${PORT}`));