const express = require("express");
const bodyParser = require("body-parser");
const path = require("path")


const app = express();
const PORT = 3333;

// app setup 
app.use(bodyParser.json());
// serve static assets
app.use("/assets", express.static(path.join(__dirname,'../assets/')));


// server the index from the views folder
app.get("/", (req, res) => {
    res.set({'content-type': 'text/html; UTF-8'})
    .sendFile(path.join(__dirname,'../views/index.html'))
});
// render the secret file
app.get("/secret", (req, res) => {
    res.set({'content-type': 'text/html; UTF-8'})
    .sendFile(path.join(__dirname,"../views/secret.html"))
});


app.use('*', (req, res) => {
    res.status(404).send('Page Not Found');
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Something went wrong');
});


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})