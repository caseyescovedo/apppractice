const PORT = 3333;


app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../views/index.html'));
});

app.get('/secret', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../views/secret.html'));
  });

app.listen(PORT, () => console.log(`listening on port ${PORT}`));