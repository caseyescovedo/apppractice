const express = require('express');
const app = express ();
const path = require ('path');
const PORT = 3333;

// serve up static files
app.use('/', express.static(path.join(__dirname, '../assets')));

// serve index.html as landing page
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../views/index.html'))
})

//serve secret.html when called
app.get('/secret', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../views/secret.html'))
})





app.listen (PORT, () => {
  console.log(`Server is listening on port ${PORT}.`)
});