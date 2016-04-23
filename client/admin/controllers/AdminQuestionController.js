quizModule.controller('AdminQuestionController', function ($state, $stateParams, $scope, $reactive, $window) {
	let reactiveContext = $reactive(this).attach($scope);
	if (!Meteor.userId()) {
		$state.go('login');
	}
	var selfCtrl = this;
	selfCtrl.rt = null;
	reactiveContext.subscribe('quiz-list-creator', ()=>[$stateParams.quizId]);
	reactiveContext.subscribe('question-list-creator', ()=>[$stateParams.quizId]);
	selfCtrl.theQuestion = {
		quiz: $stateParams.quizId
	};

	reactiveContext.helpers({
		currentQuiz: ()=> QuizCollection.findOne({_id: $stateParams.quizId}),
		listQuestion: ()=> QuestionCollection.find({quiz: $stateParams.quizId}),
		currentQuestion: ()=>QuestionCollection.findOne({_id: $stateParams.questionId})
	});
	selfCtrl.createQuestion = function () {
		$state.go('admin.questionCreate', {quizId: $stateParams.quizId});
	};
	selfCtrl.postCreateQuestion = function () {
		createQuestion(selfCtrl.theQuestion, function (err) {
			if (err) {
				console.log(err);
				return false;
			}
			//go to question list
			$state.go('admin.questionList', {quizId: $stateParams.quizId})
		})
	};
	selfCtrl.createNext = function () {
		createQuestion(selfCtrl.theQuestion, function (err) {
			if (err) {
				console.log(err);
				return false;
			}
			//go to question list
			$state.go('admin.questionCreate', {quizId: $stateParams.quizId})
		})
	};
	selfCtrl.editNext = function () {

	};
	selfCtrl.backPreviousPage = function () {
		$window.history.back();
	};
	selfCtrl.deleteQuestion = function (question) {
		if ($window.confirm("Do you want delete this question?")) {
			deleteQuestion(question._id, function (err, success) {
				if (err) {
					console.log(err);
				} else {
					$state.go('admin.questionList', {quizId: $stateParams.quizId})
				}
			})
		}
	};
	selfCtrl.postEditQuestion = function () {

	};

	//private function
	function createQuestion(doc, callback) {
		//TODO validate here
		doc.answers = Object.values(doc.answers);
		doc.createdAt = doc.updatedAt = Date.now();
		doc.number = selfCtrl.listQuestion.length + 1;
		QuestionCollection.insert(doc, callback);
	}

	function deleteQuestion(questionId, callback) {
		QuestionCollection.remove({_id: questionId}, function (err, result) {
			if (err) {
				return callback(err);
			}
			return callback(null, true)
		})
	}
});