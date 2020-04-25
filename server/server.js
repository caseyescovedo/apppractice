const express = require('express');
const app = express();
const path = require('path');

const PORT = 3333;

// Require routes

// Serve static files
app.use('/', express.static(path.resolve(__dirname, '../assets')));

// Serve main page
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../views/index.html'));
});

// Serve secret page
app.get('/secret', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../views/secret.html'));
});

// Handle routes

// Handle bad routes

// Global error handler


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});