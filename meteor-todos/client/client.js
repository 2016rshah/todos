if (Meteor.isClient) {
    Session.set("currentItem", "Just a temporary id here")

    Template.addItem.events({
        'submit form': function(event){
            event.preventDefault();
            var newItem = (event.target.newItem.value)
            event.target.newItem.value = ""
            ToDos.insert({
                item:newItem
            })
        }
    })
    Template.items.events({
        'click .item':function(event){
            var itemId = this._id
            Session.set("currentItem", itemId)
            console.log(Session.get("currentItem"))
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
}