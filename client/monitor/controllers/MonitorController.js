quizModule.controller("MonitorController", function ($scope, $state, $reactive, $stateParams) {
	let reactiveContext = $reactive(this).attach($scope);
	if (!Meteor.userId()) {
		$state.go('login');
	}
	var selfCtrl = this;
	reactiveContext.subscribe("quiz-list-creator", ()=>[$stateParams.quizId]);
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
		}
	});
	reactiveContext.autorun(()=>{
		if(reactiveContext.getReactively('visiblePlayer') && selfCtrl.visiblePlayer) {
			animationJoined();
		}
	});
	
	selfCtrl.startQuiz = function() {
		
	};
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