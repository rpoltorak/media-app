const express = require('express');
const path = require('path');

const userController = require('./controllers/user');

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(error, req, res, next) {
  console.error(error.stack);
  res.sendStatus(error.statusCode || error.status || 500);
});

app.get('/', function (req, res) {
  res.render('./index', { title: 'App' });
});

app.get('/profile', userController.getProfile);

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
