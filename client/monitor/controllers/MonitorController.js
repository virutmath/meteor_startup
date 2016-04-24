quizModule.controller("MonitorController", function ($scope, $state, $reactive, $stateParams) {
	let reactiveContext = $reactive(this).attach($scope);
	if (!Meteor.userId()) {
		$state.go('login');
	}
	var selfCtrl = this;
	var arrayAnswerIndex = ['A','B','C','D'];
	reactiveContext.subscribe("quiz-list-creator", ()=>[$stateParams.quizId]);
	reactiveContext.subscribe("question-list-creator", ()=>[$stateParams.quizId]);
	reactiveContext.subscribe("question-step", ()=>[$stateParams.quizId]);
	reactiveContext.subscribe('player-list', () => [$stateParams.quizId]);

	reactiveContext.helpers({
		currentQuiz: ()=>QuizCollection.findOne({_id: $stateParams.quizId}),
		listPlayer: ()=>PlayerCollection.find({quiz: $stateParams.quizId}).fetch().reverse(),
		visiblePlayer: ()=> {
			// console.log(reactiveContext.getReactively('listPlayer'));
			if(reactiveContext.getReactively('listPlayer') && selfCtrl.listPlayer) {
				//console.log(selfCtrl.listPlayer);
				return selfCtrl.listPlayer.slice(0,5);
			}
		},
		currentQuestionStep: () => QuestionStepCollection.findOne({quiz : $stateParams.quizId}),
		currentQuestion:()=> {
			if(reactiveContext.getReactively('currentQuestionStep') && selfCtrl.currentQuestionStep) {
				var question = QuestionCollection.findOne({_id : selfCtrl.currentQuestionStep.question});
				switch (question.correctAnswer) {
					case 'A':
						question.correctNumber = 0;
						break;
					case 'B':
						question.correctNumber = 1;
						break;
					case 'C':
						question.correctNumber = 2;
						break;
					case 'D':
						question.correctNumber = 3;
						break;
				}
				return question;
			}
		},
		isShowPercentAnswer: () => {
			if(reactiveContext.getReactively('currentQuestionStep') && selfCtrl.currentQuestionStep) {
				if(selfCtrl.currentQuestionStep.step == QUESTION_STEP.SHOW_ANSWER_STATISTIC) {
					return true;
				}else{
					return false;
				}
			}
		},
		isShowCorrectAnswer: () => {
			if(reactiveContext.getReactively('currentQuestionStep') && selfCtrl.currentQuestionStep) {
				if(selfCtrl.currentQuestionStep.step == QUESTION_STEP.SHOW_CORRECT_ANSWER) {
					return true;
				}else{
					return false;
				}
			}
		}
	});
	reactiveContext.autorun(()=>{
		if(reactiveContext.getReactively('visiblePlayer') && selfCtrl.visiblePlayer) {
			animationJoined();
		}
		if(reactiveContext.getReactively('currentQuestionStep') && selfCtrl.currentQuestionStep) {
			console.log(selfCtrl.currentQuestionStep);
			if(selfCtrl.currentQuestionStep.step == QUESTION_STEP.QUESTION_START) {
				$state.go('monitorStep', {quizId : $stateParams.quizId})
			}
		}
	});
	
	selfCtrl.startQuiz = function() {
		QuizCollection.update({_id: $stateParams.quizId}, {
			$set: {
				status: QUIZ_STATUS.playing
			}
		});
		//get first question in quiz
		var questionStep = QuestionStepCollection.findOne({quiz: $stateParams.quizId});
		if (questionStep) {
			return false;
		} else {
			var firstQuestion = QuestionCollection.findOne({quiz: $stateParams.quizId}, {$orderby: {number: 1}});
			//console.log(firstQuestion);
			if (!firstQuestion) {
				return false;
			}
			QuestionStepCollection.insert({
				quiz: $stateParams.quizId,
				question: firstQuestion._id,
				questionNumber: 1,
				step: 1,
				overtime: false
			});
			//countdown
			var countdown = this.currentQuiz.time;
			angular.element('#countdown').html(countdown);
			var interval = Meteor.setInterval(()=> {
				countdown--;
				angular.element('#countdown').html(countdown);
				if (countdown == 0) {
					Meteor.clearInterval(interval);
				}
			}, 1000);
		}
	};
	selfCtrl.showCorrectAnswer = function() {
		//update step
		QuestionStepCollection.update({_id: selfCtrl.currentQuestionStep._id}, {
			$set: {
				step: QUESTION_STEP.SHOW_CORRECT_ANSWER
			}
		});
		selfCtrl.isShowCorrectAnswer = true;
		selfCtrl.currentQuestion.correctNumber = arrayAnswerIndex.indexOf(selfCtrl.currentQuestion.correctAnswer);
	};
	selfCtrl.nextQuestion = function() {
		var nextQuestion = getNextQuestion($stateParams.quizId, selfCtrl.currentQuestion._id);
		QuestionStepCollection.update({_id: this.currentQuestionStep._id}, {
			$set: {
				questionId: nextQuestion._id,
				questionNumber: nextQuestion.number,
				step: QUESTION_STEP.QUESTION_START,
				overtime: false,
				percent: {},
				count: {}
			}
		});
		angular.element('#countdown').html(this.currentQuiz.time);
	};
	function getNextQuestion (quizId, questionId) {
		var nextQuestion = QuestionCollection.findOne({
			quiz: quizId,
			_id: {$ne: questionId},
			number: {$gt: selfCtrl.currentQuestion.number}
		}, {
			$orderby: {order: 1}
		});
		if (!nextQuestion) {
			return -1;
		} else {
			return nextQuestion;
		}
	}
	function animationJoined() {
		$('.gamer-embark-item').eq(0).animate({
			fontSize : '32px'
		},1000).animate({
			fontSize: '24px',
			color: '#333',
			backgroundColor: '#fff'
		},1000)
	}
});