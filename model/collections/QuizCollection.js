QuizCollection = new Mongo.Collection('quiz');

QuizCollection.allow({
	insert: function (userId, quiz) {
		return true;
	},
	update: function (userId, quiz, fields, modifier) {
		return true;
	},
	remove: function (userId, quiz) {
		return true;
	}
});