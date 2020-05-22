
const express = require('express');
const path = require("path");
const app = express();
const PORT = 3333;
const bodyParser = require('body-parser');
const apiRouter = require("./routes/api.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.use("/api", apiRouter);
app.get('/secret', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "../views/secret.html"));
})
app.use("/css/style.css", (req, res) => {
  res.set({
    "Content-Type": "text/css",
    charset: "UTF-8",
  });
  res.status(200).sendFile(path.join(__dirname, "../assets/css/style.css"));
});

app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "../views/index.html"));
})


app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
});