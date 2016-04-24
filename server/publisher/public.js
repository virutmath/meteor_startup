Meteor.publish('player-list', function (quizId) {
	return PlayerCollection.find({quiz: quizId})
});
Meteor.publish('player-answer', function (playerId) {
	return PlayerAnswerCollection.find({player: playerId})
});
Meteor.publish('quiz-public-list', function (quizId) {
	return QuizCollection.find({_id: quizId});
});
Meteor.publish('question-public-list', function (quizId) {
	return QuestionCollection.find({quiz: quizId});
});
Meteor.publish('question-step', function (quizId) {
	return QuestionStepCollection.find({quiz: quizId})
});