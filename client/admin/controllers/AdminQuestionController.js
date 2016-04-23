quizModule.controller('AdminQuestionController', function($state, $stateParams, $scope, $reactive) {
	let reactiveContext = $reactive(this).attach($scope);
	var selfCtrl = this;
	reactiveContext.subscribe('quiz-list-creator',()=>{
		return [$stateParams.quizId]
	});
	reactiveContext.subscribe('question-list-creator',()=>{
		return [$stateParams.quizId]
	});
	reactiveContext.helpers({
		currentQuiz: ()=>{
			return QuizCollection.findOne({_id : $stateParams.quizId});
		},
		listQuestion: ()=>{
			return QuestionCollection.find({quizId : $stateParams.quizId});
		}
	});
	
	selfCtrl.deleteQuestion = function() {
		
	};
});