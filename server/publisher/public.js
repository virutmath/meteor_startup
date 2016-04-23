Meteor.publish('player-list', function (quizId) {
	return PlayerCollection.find({quiz: quizId})
});