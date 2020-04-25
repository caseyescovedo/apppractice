const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const router = express.Router();
const taskRouter = require('./taskRouter.js');

const PORT = 3333;

app.use('/assets', express.static(path.join(__dirname, '../assets')));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(
  'mongodb+srv://Umius_Brian:MuffinsAndMilk00@cluster0-ffgy1.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

mongoose.connection
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch((err) => console.log('Unsuccessful connection to MongoDB: ', err));

//////////

app.use('/tasks', taskRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
})

app.get('/secret', (req, res) => {
  res.sendFile(path.join(__dirname, '..views/secret.html'));
})







app.listen(PORT, () => console.log(`Listening to PORT: ${PORT}`));

