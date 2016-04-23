quizModule.config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
	var MONITOR_TEMPLATE_PATH = 'client/monitor/views';
	var ADMIN_TEMPLATE_PATH = 'client/admin/views';
	var PLAYER_TEMPLATE_PATH = 'client/player/views';

	$locationProvider.html5Mode(true);


	$stateProvider
		.state('admin', {
			url: '/admin',
			templateUrl: ADMIN_TEMPLATE_PATH + '/index.html',
			controller: 'AdminController',
			controllerAs: 'ad'
		})
		.state('admin.quizCreate',{
			url : '/quiz/create',
			templateUrl: ADMIN_TEMPLATE_PATH + '/quiz/create.html',
			controller: 'AdminQuizController',
			controllerAs: 'qi'
		})
		.state('admin.quizEdit',{
			url: '/quiz/edit',
			controller: 'AdminQuizController',
			controllerAs: 'qi'
		})
		.state('admin.quizList',{
			url: '/quiz/list',
			controller: 'AdminQuizController',
			controllerAs: 'qi'
		})
		.state('admin.questionList',{
			url: '/question/list/:quizId',
			templateUrl: ADMIN_TEMPLATE_PATH + '/question/list.html',
			controller: 'AdminQuestionController',
			controllerAs: 'qe'
		})
		.state('admin.questionCreate',{
			url: '/question/create/:quizId',
			templateUrl: ADMIN_TEMPLATE_PATH + '/question/create.html',
			controller: 'AdminQuestionController',
			controllerAs: 'qe'
		})
		.state('admin.questionEdit',{
			url: '/question/edit/:quizId/:questionId',
			templateUrl: ADMIN_TEMPLATE_PATH + '/question/edit.html',
			controller: 'AdminQuestionController',
			controllerAs: 'qe'
		})
		.state('login',{
			url : '/login',
			templateUrl: ADMIN_TEMPLATE_PATH + '/authen/login.html',
			controller: 'AuthenController',
			controllerAs : 'ac'
		})
		.state('logout',{
			url : '/logout',
			controller: function($state) {
				Meteor.logout(()=>{
					$state.go('login');
				});
			}
		});
	
	$urlRouterProvider.otherwise('/home');
});