quizModule.controller('AuthenController', function ($scope, $state, $reactive) {
	let reactiveContext = $reactive(this).attach($scope);
	//if logged -> go to home
	if (Meteor.userId()) {
		$state.go('home');
	}
	this.errorMsg = [];
	this.login = function () {
		var username = $scope.username;
		var password = $scope.password;
		Meteor.loginWithPassword(username, password, function (error) {
			if (error && $scope.errorMsg.indexOf(error.reason) === -1) {
				$scope.errorMsg.push(error.reason);
			} else {
				$state.go("admin"); // Redirect user if registration succeeds
			}
		})
	};
});