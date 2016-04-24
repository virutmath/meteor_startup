quizModule.controller("PlayerController", function($scope, $state, $reactive, $stateParams, $window){
	let reactiveContext = $reactive(this).attach($scope);
	var selfCtrl = this;
	reactiveContext.subscribe('player-list', () => [$stateParams.quizId]);
	reactiveContext.subscribe('player-answer', () => [$stateParams.playerId]);
	reactiveContext.subscribe('quiz-public-list', ()=>[$stateParams.quizId]);
	reactiveContext.subscribe("question-step", ()=>[$stateParams.quizId]);
	reactiveContext.subscribe("question-public-list", ()=>[$stateParams.quizId]);

	reactiveContext.helpers({
		listPlayer : ()=>PlayerCollection.find({quiz : $stateParams.quizId}),
		currentQuiz: ()=>QuizCollection.findOne({_id : $stateParams.quizId}),
		currentPlayer: ()=>PlayerCollection.findOne({_id : $stateParams.playerId}),
		currentQuestionStep: () => QuestionStepCollection.findOne({quiz : $stateParams.quizId}),
		currentQuestion:()=> {
			if(reactiveContext.getReactively('currentQuestionStep') && selfCtrl.currentQuestionStep) {
				return QuestionCollection.findOne({_id : selfCtrl.currentQuestionStep.question})
			}
		},
		currentPlayerAnswer: ()=> {
			if(reactiveContext.getReactively('currentQuestionStep') && selfCtrl.currentQuestionStep) {
				return PlayerAnswerCollection.findOne({question : selfCtrl.currentQuestionStep.question})
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
		},
	});
	selfCtrl.thePlayer = {
		quiz : $stateParams.quizId
	};
	//console.log($stateParams);
	var arrayAnswerIndex = ['A','B','C','D'];
	selfCtrl.chooseAnswer = function(index) {
		if (this.currentQuestionStep.overtime) {
			$window.alert('Time up');
			return false;
		}
		//TODO add case ranking type
		//current : fix with knockout type
		PlayerAnswerCollection.insert({
			player: $stateParams.playerId,
			question: selfCtrl.currentQuestion._id,
			answer: arrayAnswerIndex[index],
			correct: arrayAnswerIndex[index] == selfCtrl.currentQuestion.correctAnswer
		}, (error) => {
			if (error) {
				console.log(error);
			}
		});
		if(!arrayAnswerIndex[index] == selfCtrl.currentQuestion.correctAnswer) {
			//knockout
			PlayerCollection.update({_id : $stateParams.playerId},{
				$set : {
					knockout : true
				}
			})
		}
	};
	selfCtrl.postCreatePlayer = function() {
		createPlayer(selfCtrl.thePlayer, function(err, result) {
			if(err) {
				console.log(err);
				$window.alert("Your nickname has existed!");
				return false;
			}else{
				$state.go('playWait',{quizId: $stateParams.quizId, playerId : result})
			}
		})
	};

	reactiveContext.autorun(()=>{
		if(reactiveContext.getReactively('currentQuestionStep') && selfCtrl.currentQuestionStep) {
			// console.log(selfCtrl.currentQuestionStep);
			if(selfCtrl.currentQuestionStep.step == QUESTION_STEP.QUESTION_START && $stateParams.playerId) {
				$state.go('playStep', {quizId : $stateParams.quizId, playerId : $stateParams.playerId})
			}
		}
	});
	
	function createPlayer(doc, callback) {
		//TODO validate user
		doc.createdAt = Date.now();
		PlayerCollection.insert(doc,function(err, result){
			if(err) {
				console.log(err);
				callback(err);
			}else{
				console.log(result);
				callback(null, result);
			}
		})
	}
});