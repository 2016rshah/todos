if (Meteor.isServer) {
	Meteor.methods({
		remove: function (id) {
			return ToDos.remove({_id:id})
		}
	});
}