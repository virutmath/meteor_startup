quizModule.controller("AdminQuizController", function($scope, $state, $reactive, $stateParams, $window){
	let reactiveContext = $reactive(this).attach($scope);
	if (!Meteor.userId()) {
		$state.go('login');
	}
	var selfCtrl = this;
	reactiveContext.subscribe('quiz-list-creator', ()=>[$stateParams.quizId]);
	reactiveContext.subscribe('question-list-creator', ()=>[$stateParams.quizId]);
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
	reactiveContext.helpers({
		listQuiz : ()=>QuizCollection.find()
	});
	this.deleteQuiz = function(quiz) {
		if ($window.confirm("Do you want delete this question?")) {
			deleteQuiz(quiz._id, function (err, success) {
				if (err) {
					console.log(err);
				} else {
					$state.go('admin.quizList')
				}
			})
		}
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
	function deleteQuiz(quizId, callback) {
		QuizCollection.remove({_id : quizId}, function(err, result) {
			if(err) {
				return callback(err);
			}
			var list = QuestionCollection.find({quiz : quizId}).fetch();
			var flag = false;
			list.forEach(function(item){
				QuestionCollection.remove({_id: item._id}, function (err, done) {
					flag = !err;
				})
			});
			if(flag) {
				return callback(null, true);
			}else{
				return callback(null, false);
			}

		});

	}
});