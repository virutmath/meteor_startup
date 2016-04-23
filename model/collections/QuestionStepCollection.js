QuestionStepCollection = new Mongo.Collection('question_steps');

QuestionStepCollection.allow({
	insert: function (userId, document) {
		if (!Roles.userIsInRole(userId, ['admin', 'creator']))
			return false;
		//if quiz id exists in QuestionStep => return fasle
		if (QuestionStepCollection.findOne({quiz: document.quiz})) {
			console.log('Quiz is in step');
			return false;
		}
		return true;
	},
	update: function (userId, document, fieldNames, modifier) {
		//only update question step if userId create quiz
		if (QuestionStepCollection.findOne({_id: document.quiz, user: userId})) {
			return true;
		} else {
			console.log('You have not permission in this quiz');
			return false;
		}
	},
	remove: function (userId, document) {
		return !!QuestionStepCollection.findOne({_id: document.quiz, user: userId});
	}
});
