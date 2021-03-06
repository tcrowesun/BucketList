Tasks = new Mongo.Collection("tasks");

var isTrue = false;

if (Meteor.isClient) {
   // This code only runs on the client

  Template.registerHelper('formatDate', function(date){
    return moment(date).format('MM-DD-YYYY');
  });

  Template.simpleTodos.helpers({
    tasks: function () {

        return Tasks.find({completed: {$ne: true}}, {sort: {createdAt: -1}});


   },

    incompleteCount: function () {
      return Tasks.find({completed: {$ne: true}}).count();
    },

    emptyTasks: function(){
      return Tasks.find({completed: {$ne: true}}).count()===0;
    }
  });

  Template.simpleTodos.events({
    "submit .new-task": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var title = event.target.text.value;

      // Insert a task into the collection
      Tasks.insert({
        title: title,
        createdAt: new Date(), // current time
        completed: false,
        category: "Other",
        reminder: "None"
      });

      // Clear form
        event.target.text.value = "";
    },

  });

  Template.task.events({
    "click .check": function () {
      // Set the checked property to the opposite of its current value
      Tasks.update(this._id, {
        $set: {
          completed: true}
      });
    },
    "click .delete": function () {
      Tasks.remove(this._id);
    }
  });

  Template.completeTask.events({
    "click .minus": function () {
      // Set the checked property to the opposite of its current value
      Tasks.update(this._id, {
        $set: {
          completed: false}
      });
    },
    "click .delete": function () {
      Tasks.remove(this._id);
    }
  });

  Template.nav_back.helpers({
    backPointer: function() {
      if (this.category !== undefined){
        return Session.get('prevPrevBackPointer');
      } else {
        return Session.get('prevBackPointer');
      }
    }
  });

  Template.taskPage.helpers({
    statusLabel: function(complete){
      if (complete === true) {
        return 'label-success';
      } else {
        return 'label-danger';
      }
    },
    statusValue: function(complete) {
      if (complete === true) {
        return 'complete';
      } else {
        return 'incomplete';
      }
    }
  });

  Template.taskPage.events({
    "click .reminder-edit": function(){
      event.preventDefault;
      var val = event.target.id;
      Tasks.update(this.task._id, {
        $set: {reminder: val}
      })
    },
    "click .category-edit": function(){
      event.preventDefault;
      var val = event.target.id;

      Tasks.update(this.task._id, {
        $set: {category: val}
      })
    }
  });



  Template.navigation.events({
    "click .hamburger-menu": function(){
      if(isTrue){
        $(".menu-buttons").fadeOut();
        isTrue = false;

      }
      else {
        $(".menu-buttons").fadeIn();
        isTrue = true;
      }
    }
  });

  Template.past.helpers({
      completedTasks: function () {

        return Tasks.find({completed: {$ne: false}}, {sort: {createdAt: -1}});

   },
      emptyTasks: function(){
        return Tasks.find({completed: {$ne: false}}).count()===0;
      }

  });
}
