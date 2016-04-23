quizModule.controller("MonitorController", function($scope, $state, $reactive, $stateParams){
	let reactiveContext = $reactive(this).attach($scope);
	if (!Meteor.userId()) {
		$state.go('login');
	}
	var selfCtrl = this;
	reactiveContext.subscribe("quiz-list-creator",()=>[$stateParams.quizId]);
	reactiveContext.subscribe('player-list', () => [$stateParams.quizId]);

	reactiveContext.helpers({
		currentQuiz:()=>QuizCollection.findOne({_id : $stateParams.quizId})
	});
});