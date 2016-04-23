quizModule.controller("AdminController", ($scope, $state, $reactive) => {
	let reactiveContext = $reactive(this).attach($scope);
	if(!Meteor.userId()) {
		$state.go('login');
	}
});