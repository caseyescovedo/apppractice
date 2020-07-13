const express = require('express');
const path = require('path');
const app = express();

const connectDB = require('./db');
const authController = require('./controllers/authController');

const PORT = process.env.PORT || 3333;

connectDB();

app.get('/', (req, res) => {
  res.sendFile(path.resolve('./views', 'index.html'));
});

//app.get('/secret', require('./routes/secret'));
app.get('/secret', (req, res) => {
  res.sendFile(path.resolve('./views', 'secret.html'));
});

app.get('/css/style.css', (req, res) => {
  res.sendFile(path.resolve('./assets/css', 'style.css'));
});

app.get('/js/index.js', (req, res) => {
  res.sendFile(path.resolve('./assets/js', 'index.js'));
});

app.use(express.json());
app.use('/api/tasks', require('./routes/tasks'));

app.use(express.urlencoded({ extended: true }));
app.use('/signin', require('./routes/auth'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
