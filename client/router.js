quizModule.config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
	var MONITOR_TEMPLATE_PATH = 'client/monitor/views';
	var ADMIN_TEMPLATE_PATH = 'client/admin/views';
	var PLAYER_TEMPLATE_PATH = 'client/player/views';

	$locationProvider.html5Mode(true);


	$stateProvider

		.state('admin', {
			url: '/admin',
			templateUrl: ADMIN_TEMPLATE_PATH + '/admin.html',
			controller: 'AdminController',
			controllerAs: 'db'
		});
	
	$urlRouterProvider.otherwise('/home');
});