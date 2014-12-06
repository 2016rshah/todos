if (Meteor.isClient) {

    Deps.autorun(function () {
      // if (Meteor.user()) console.log('User is logged');
      // else console.log('User is not logged');
      Meteor.subscribe('ToDos', Meteor.userId());
    });


    
    Session.set("currentItem", "Just a temporary id here")
    Template.addItem.events({
        'submit form': function(event){
            event.preventDefault();
            var newItem = (event.target.newItem.value)
            id = Meteor.userId()
            console.log(id)
            if(newItem.length>0){
                event.target.newItem.value = ""
                ToDos.insert({
                    item:newItem, 
                    owner:id
                })
            }
        }
    })
    Template.items.events({
        'click .item':function(event){
            // console.log("parent: ", event.target.parentElement)
            if(this._id != Session.get("currentItem")){
                $(".item").each(function(index){
                    $(this).removeClass("active")
                })
                event.target.className+=" active"
                var itemId = this._id
                Session.set("currentItem", itemId)
                console.log(Session.get("currentItem"))
            }
        }
    })
    Template.items.helpers({
        items: function () {
            return ToDos.find()
        }
    });
    Template.removeItem.events({
        'click #removeItem': function () {
            Meteor.call("remove", Session.get("currentItem"), function(err, res){
                console.log("Number of items removed: ", res)
            })
        }
    });
    Accounts.ui.config({
       passwordSignupFields: 'USERNAME_ONLY'
    });
}