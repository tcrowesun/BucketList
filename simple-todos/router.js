Router.route('/', function() {
  this.render('simpleTodos');
});

Router.route('/categories', function() {
  this.render('categories');
});
Router.route('/past', function() {
  this.render('past');
});

Router.route('/taskPage/:_id', function() {
  this.render('taskPage', {data: function(){
    return Tasks.findOne({_id: this.params._id});
  }});
});

Router.route('/categoryList/:_category', {
  path: '/categoryList/:_category',
  template: 'categoryList',
  data: function () {
    return {
      categoryTasks: Tasks.find({category: this.params._category}, {sort: {createdAt: -1}}),
      category: this.params._category
    }
  }
});
