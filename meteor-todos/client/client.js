if (Meteor.isClient) {

    Deps.autorun(function () {
      Meteor.subscribe('ToDos', Meteor.userId(), function(){
        UnCompleted = ToDos.find({completed:false})
      });
      Meteor.subscribe('Completed', Meteor.userId(), function(){
        Completed = ToDos.find({completed:true})
      });
    });


    Template.addItem.events({
        'submit form': function(event){
            event.preventDefault();
            var newItem = (event.target.newItem.value)
            id = Meteor.userId()
            if(newItem.length>0){
                event.target.newItem.value = ""
                ToDos.insert({
                    item:newItem, 
                    owner:id,
                    completed:false
                })
            }
        }
    })
    Template.items.events({
        'click .markCompleted': function(event){
            ToDos.update({_id:this._id}, {$set: {completed:true}})
        }
    })
    Template.items.helpers({
        items: function () {
            return ToDos.find({completed:false})
        }
    });
    Template.completed.helpers({
        items: function () {
            return ToDos.find({completed:true})
        }
    });
    Template.completed.events({
        'click .delCompleted': function(event){
            Meteor.call("remove", this._id, function(err, res){
                console.log("Number of items removed: ", res)
            })
        }, 
        'dblclick li': function(event){
            ToDos.update({_id:this._id}, {$set: {completed:false}})
        }
    })
    Accounts.ui.config({
       passwordSignupFields: 'USERNAME_ONLY'
    });
}