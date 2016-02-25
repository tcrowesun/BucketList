Router.route('/', function() {
  this.render('simpleTodos');
});
Router.route('/categories', function() {
  this.render('categories');
});
Router.route('/past', function() {
  this.render('past');
});
Router.route('/categoryList/:_category', function() {
  this.render('categoryList');
});
