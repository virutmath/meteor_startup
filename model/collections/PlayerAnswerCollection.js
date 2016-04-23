PlayerAnswerCollection = new Mongo.Collection('player_answers');

PlayerAnswerCollection.allow({
	insert: function (userId, doc) {
		//check exists
		if (PlayerAnswerCollection.findOne({player: doc.player, question: doc.question})) {
			return false;
		}
		return !!doc;
	},
	remove: function (userId, doc) {
		return !!PlayerAnswerCollection.findOne({player: doc.player, question: doc.question})
	}
});