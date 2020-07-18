const express = require('express');
const app = express();
const port = 3333;
const path = require('path');

app.use(express.json());

// serve css and js files. express.static automatically set correct content-type headers
app.use(express.static('assets'));

// serve index.html when user visits http://localhost:3333/
app.get('/', (req, res) =>
  res.status(200).sendFile(path.resolve('./views/index.html'))
);

// serve index.html when user visits http://localhost:3333/
app.get('/secret', (req, res) =>
  res.status(200).sendFile(path.resolve('./views/secret.html'))
);

// handle invalid URLs
app.get('*', (req, res) => res.status(404).send('Error 404: Page not found'));

// global error handler
app.use(function (err, req, res, next) {
  console.error(`We encountered an error: ${err}`);
  res.status(500).send('Something broke!');
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
