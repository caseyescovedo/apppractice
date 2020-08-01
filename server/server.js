// ! imports
const express = require('express');
const app = express();
const path = require('path')
const PORT = 3333;
const cookieParser = require('cookie-parser')


// ! Bodyparser Middleware
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended: true}))




// ! serve the html static assets 
app.use(express.static("assets")) // bring in static assets in the asset folder

// getting the login page
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../views/index.html'))
})

// getting the secret page
app.get('/secret', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../views/secret.html'))
})





// ! Start Server
app.listen(PORT, () => {
  console.log("Listening on Port " + PORT)
})


