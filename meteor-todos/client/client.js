if (Meteor.isClient) {

    Session.set("currList", "Default")


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
                    completed:false, 
                    listName:Session.get("currList")
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
            return ToDos.find({completed:false, listName:Session.get("currList")})
        }
    });
    Template.completed.helpers({
        items: function () {
            return ToDos.find({completed:true, listName:Session.get("currList")})
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


    Template.newList.events({
        'submit form': function (event) {
            event.preventDefault()
            Session.set("currList", event.target.newList.value)
            ToDos.insert({
                item:"Create the list", 
                owner:Meteor.userId(),
                completed:true, 
                listName:Session.get("currList")
            })
            event.target.newList.value = ""
        }, 
        'click #hide-btn': function(event){
            $("#newListWrapper").hide()
        }
    });
    Template.lists.helpers({
        lists: function () {
            var lists = []
            var items = ToDos.find().fetch()
            for(var i = 0; i<items.length; i++){
                if(lists.indexOf(items[i].listName) == -1 && items[i].listName !== "Default"){
                    console.log(items[i].listName)
                    lists.push(items[i].listName)
                }
            }
            for(var i = 0; i<lists.length; i++){
                lists[i] = {listName:lists[i]}
            }
            return lists
        }, 
        currentList:function(){
            return Session.get("currList")
        }
    });
    Template.lists.events({
        'click .listName': function (event) {
            //console.log(event.target.innerText)
            Session.set("currList", event.target.innerText)
            console.log("changing lists")
        },
        'click #addList': function(event){
            $("#newListWrapper").show   ()
        }, 
        'click #defaultList': function(event){
            Session.set("currList", "Default")
        }
    });
}