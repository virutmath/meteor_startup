quizModule.controller("AdminQuizController", function($scope, $state, $reactive, $stateParams, $window, $http){
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
		currentQuiz: ()=>QuizCollection.findOne({_id : $stateParams.quizId}),
		listQuiz : ()=>QuizCollection.find(),
		listQuestion: ()=>QuestionCollection.find({quiz : $stateParams.quizId})
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
	this.detailPublish = function(quiz) {
		//generate short url
		getShortLink(quiz,function(err, shortUrl) {
			if(err) {
				console.log(err);
				return false;
			}else{
				$state.go('admin.publishDetail',{quizId : quiz._id});
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
	function getShortLink(quiz,callback) {
		if(!quiz) {
			return callback(new Error("Event not found"))
		}
		if(!quiz.shortUrl) {
			$http.post(GOOGLEAPI_SHORTENER_URL, JSON.stringify({
				longUrl: APP_DOMAIN + $state.href('monitor',{quizId : quiz._id})
			})).then((resp)=> {
				//save to quiz
				QuizCollection.update({_id : quiz._id}, {
					$set : { shortUrl : resp.data.id}
				}, function(err, result) {
					if(err) {
						return callback(err);
					}
					return callback(null,resp.data.id);
				});
			});
		}else{
			callback(null,quiz.shortUrl);
		}
	}
});