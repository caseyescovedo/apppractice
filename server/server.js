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
app.use('/assets', express.static(path.join(__dirname, '../assets/css/style.css')))


app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../views/index.html'))
})













// ! Start Server
app.listen(PORT, () => {
  console.log("Listening on Port " + PORT)
})


