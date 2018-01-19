const passport = require('passport');
const User = require('../models/User');

/**
 * Login required middleware
 */
exports.ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
};

/**
 * GET /login
 */
exports.renderLoginPage = function(req, res) {
  if (req.user) {
    return res.redirect('/');
  }

  res.render('./auth/login', {
    title: 'Log in'
  });
};

/**
 * POST /login
 */
exports.login = function(req, res, next) {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('email', 'Email cannot be blank').notEmpty();
  req.assert('password', 'Password cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  var errors = req.validationErrors();

  if (errors) {
    req.flash('error', errors);
    return res.redirect('/login');
  }

  passport.authenticate('local', function(err, user, info) {
    if (!user) {
      req.flash('error', info);
      return res.redirect('/login')
    }

    req.logIn(user, function(err) {
      res.redirect('/');
    });
  })(req, res, next);
};

/**
 * GET /logout
 */
exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

/**
 * GET /signup
 */
exports.renderSignupPage = function(req, res) {
  if (req.user) {
    return res.redirect('/');
  }

  res.render('./auth/signup', {
    title: 'Sign up'
  });
};

/**
 * POST /signup
 */
exports.signup = function(req, res, next) {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('email', 'Email cannot be blank').notEmpty();
  req.assert('password', 'Password must be at least 4 characters long').len(4);
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  var errors = req.validationErrors();

  if (errors) {
    req.flash('error', errors);
    return res.redirect('/signup');
  }

  new User({
    email: req.body.email,
    password: req.body.password
  }).save()
    .then(function(user) {
      req.logIn(user, function(err) {
        res.redirect('/');
      });
    })
    .catch(function(err) {
      if (err.code === 'ER_DUP_ENTRY' || err.code === '23505') {
        req.flash('error', { msg: 'The email address you have entered is already associated with another account.' });
        return res.redirect('/signup');
      }
    });
};
