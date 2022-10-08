const path = require('path');

const express = require('express');
const session = require('express-session');
const csrf = require('csurf');

const db = require('./data/database');
const { createSessionStore, createSessionConfig } = require('./config/session');
const authMiddleware = require('./middlewares/auth-middleware');
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blog');

const mongoDbSessionStore = createSessionStore(session);

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(session(createSessionConfig(mongoDbSessionStore)));
app.use(csrf());

app.use(authMiddleware);

app.use(authRoutes);
app.use(blogRoutes);

app.use(function (error, req, res, next) {
	res.render('500');
});

db.connectToDatabase().then(function () {
	app.listen(3000);
});
