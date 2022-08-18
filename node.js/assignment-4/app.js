const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const userRouter = require('./routes/user.js');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(userRouter);
app.use((req, res) => {
	res.status(404).render('404', { pageTitle: 'Page not found!!' });
});

app.listen(3000);
