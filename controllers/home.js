/**
 * GET /
 */
exports.renderHomePage = function(req, res) {
  res.render('./home', {
    title: 'Home page'
  });
};
