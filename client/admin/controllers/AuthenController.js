quizModule.controller('AuthenController', function ($scope, $state, $reactive) {
	let reactiveContext = $reactive(this).attach($scope);
	//if logged -> go to home
	if (Meteor.userId()) {
		$state.go('admin');
	}
	var selfCtrl = this;
	selfCtrl.errorMsg = [];
	selfCtrl.loginData = {
		username : "",
		password: ""
	};
	this.postLogin = function () {
		var username = selfCtrl.loginData.username;
		var password = selfCtrl.loginData.password;
		Meteor.loginWithPassword(username, password, function (error) {
			if (error && selfCtrl.errorMsg.indexOf(error.reason) === -1) {
				$scope.errorMsg.push(error.reason);
				console.log(err);
			} else {
				$state.go("admin"); // Redirect user if registration succeeds
			}
		})
	};
});