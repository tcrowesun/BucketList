Router.route('/', function() {
  Session.set('prevBackPointer', '/');
  this.render('simpleTodos');
});

Router.route('/categories', function() {
  Session.set('prevPrevBackPointer', '/categories');
  this.render('categories');
});
Router.route('/past', function() {
  Session.set('prevBackPointer', '/past');
  this.render('past');
});

Router.route('/taskPage/:_id', function() {
  this.render('taskPage', {
    data: function(){
    return {
      task: Tasks.findOne({_id: this.params._id})
    };
  }});
});

Router.route('/login', function() {
	this.render('login');
});


Router.route('/categoryList/:_category', function(){
  Session.set('prevBackPointer', '/categoryList/' + this.params._category);
  this.render('categoryList', {
    data: function () {
      return {
      categoryTasks: Tasks.find({category: this.params._category, completed: false}, {sort: {createdAt: -1}}),
      category: this.params._category,
      emptyTasks: Tasks.find({category: this.params._category, completed: false}, {sort: {createdAt: -1}}).count()===0
      }
    }
  });

});
