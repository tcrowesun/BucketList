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
  this.render('categoryList', {data: function(){
    return Tasks.find({category:{$eq:_category}}, {sort: {createdAt: -1}});
  }});
});
Router.route('/taskPage/:_id', function() {
  this.render('taskPage', {data: function(){
    return Tasks.findOne({_id: this.params._id});
  }});
});
Router.route('/login', function() {
	this.render('login');
});
