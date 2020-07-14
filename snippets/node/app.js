const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Home page'));

app.get('/dogs', (req, res) => res.send('Dogs page'));

app.get('*', (req, res) => res.send('url contains anything'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
