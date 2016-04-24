quizModule.controller("PlayerController", function($scope, $state, $reactive, $stateParams, $window){
	let reactiveContext = $reactive(this).attach($scope);
	var selfCtrl = this;
	reactiveContext.subscribe('player-list', () => [$stateParams.quizId]);
	reactiveContext.subscribe('quiz-public-list', ()=>[$stateParams.quizId]);

	reactiveContext.helpers({
		listPlayer : ()=>PlayerCollection.find({quiz : $stateParams.quizId}),
		currentQuiz: ()=>QuizCollection.findOne({_id : $stateParams.quizId}),
		currentPlayer: ()=>PlayerCollection.findOne({_id : $stateParams.playerId})
	});
	selfCtrl.thePlayer = {
		quiz : $stateParams.quizId
	};
	console.log($stateParams);

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