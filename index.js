const express = require('express');
const path = require('path');
const passport = require('passport');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
const dotenv = require('dotenv');

const homeController = require('./controllers/home');
const userController = require('./controllers/user');

require('./config/passport');

if (process.env.NODE_ENV !== 'production') {
  dotenv.load();
}

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(flash());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  })
);

app.use(function(error, req, res, next) {
  console.error(error.stack);
  res.sendStatus(error.statusCode || error.status || 500);
});

app.get('/', homeController.renderHomePage);
app.get('/signup', userController.renderSignupPage);
app.post('/signup', userController.signup);
app.get('/login', userController.renderLoginPage);
app.post('/login', userController.login);
app.get('/logout', userController.logout);

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
