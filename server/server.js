const path = require ('path');
const express = require ('express');
const bodyParser = require ('body-parser');

const app = express();
const PORT = 3333;

//route handler to respond with main app
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'))
})

// secret html to run the to do app
app.get('/secret', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/secret.html'))
})

//serve css and js files from assets folder
app.use('/assets', express.static(path.join(__dirname, '../assets/css')))
app.use('/assets', express.static(path.join(__dirname, '../assets/js')))

//catch-all route handler for unknown requests
app.get('*', (req, res) => {
    res.status(404).send("Invalid route.")
})

//starting server
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });