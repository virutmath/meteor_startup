Meteor.publish('player-list', function (quizId) {
	return PlayerCollection.find({quiz: quizId})
});
Meteor.publish('quiz-public-list', function (quizId) {
	return QuizCollection.find({_id: quizId});
});