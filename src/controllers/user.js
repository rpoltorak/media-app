/**
 * GET /profile
 */
exports.getProfile = function(req, res) {
  res.render('./profile', { title: 'My Profile' });
};
