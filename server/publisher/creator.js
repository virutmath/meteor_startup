Meteor.publish('quiz-list-creator', function (quizId) {
	if (this.userId && Roles.userIsInRole(this.userId, ['admin', 'creator'])) {
		if (quizId)
			return QuizCollection.find({_id: quizId, user: this.userId});
		else
			return QuizCollection.find({user: this.userId})
	} else {
		return false;
	}
});
Meteor.publish('question-list-creator', function (quizId) {
	if (this.userId && quizId && Roles.userIsInRole(this.userId, ['admin', 'creator'])) {
		var quiz = QuizCollection.find({user: this.userId, _id: quizId}).fetch();
		if (quiz) {
			return QuestionCollection.find({quiz: quizId});
		}else{
			return false;
		}
	}else{
		return false;
	}
});