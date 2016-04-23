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
		shortUrl: "",
		type : QUIZ_TYPE.knockout
	};
	// console.log(selfCtrl.theQuiz);
	this.postCreateQuiz = function() {
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
		selfCtrl.theQuiz.createdAt = selfCtrl.theQuiz.updatedAt = Date.now();
		QuizCollection.insert(selfCtrl.theQuiz, (error, id)=>{
			if(error) {
				return callback(error);
			}
			callback(null, id);
		})
	}
});