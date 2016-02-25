Tasks = new Mongo.Collection("tasks");

var isTrue = false;

if (Meteor.isClient) {
   // This code only runs on the client
  Template.simpleTodos.helpers({
    tasks: function () {

        return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
  
       
   },
  
    incompleteCount: function () {
      return Tasks.find({checked: {$ne: true}}).count();
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
        description: "",
        completed: false,
        category: "other",
        reminder: ""
      });

      // Clear form
        event.target.text.value = "";
    },
    
  });

  Template.task.events({
    "click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      Tasks.update(this._id, {
        $set: {
          checked: ! this.checked,
          completed: !this.completed}
      });
    },
    "click .delete": function () {
      Tasks.remove(this._id);
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
    "submit .new-task"
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
      
        return Tasks.find({checked: {$ne: false}}, {sort: {createdAt: -1}});
      
   },

  });
}
