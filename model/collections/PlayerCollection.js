PlayerCollection = new Mongo.Collection('players');
PlayerCollection.allow({
	insert: function (userId, doc) {
		if (!doc.quiz) {
			return false;
		}
		//TODO check limit player
		//check unique user
		return !PlayerCollection.findOne({nickname: doc.nickname, quiz: doc.quiz});
	},
	update: function (userId, doc) {
		return userId && QuizCollection.findOne({_id: doc.quiz, user: userId});
	},
	remove: function (userId, doc) {
		return userId && QuizCollection.findOne({_id: doc.quiz, user: userId});
	}
});