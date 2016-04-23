quizModule.controller("AdminQuizController", function($scope, $state, $reactive){
	let reactiveContext = $reactive(this).attach($scope);
	var selfCtrl = this;
	if (!Meteor.userId()) {
		$state.go('login');
	}
	selfCtrl.theQuiz = {
		title : "",
		user : Meteor.userId(),
		theme : QUIZ_THEME.light,
		shortUrl: ""
	};
	// console.log(selfCtrl.theQuiz);
	this.createQuiz = function() {
		saveQuiz((error,quizId)=>{
			if(error) {
				console.log(error.message);
			}else{
				$state.go('admin.questionList', {quizId : quizId})
			}
		});
	};
	function saveQuiz(callback) {
		if(!selfCtrl.theQuiz.time) {
			selfCtrl.theQuiz.time = 30;
		}
		QuizCollection.insert(selfCtrl.theQuiz, (error, id)=>{
			if(error) {
				return callback(error);
			}
			callback(null, id);
		})
	}
});