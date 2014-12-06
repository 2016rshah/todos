if (Meteor.isServer) {
	Meteor.methods({
		remove: function (id) {
			return ToDos.remove({_id:id})
		}
	});
	Meteor.publish('ToDos', function (userId) {
		return ToDos.find({owner:userId, completed:false})
		console.log(userId)
		//return ToDos.find({owner:userId})
	});
	Meteor.publish('Completed', function(userId){
		return ToDos.find({owner:userId, completed:true})
	})
}