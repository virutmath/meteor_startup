quizModule = angular.module('quizSystem'
	, [
		'angular-meteor',
		'angular-meteor.auth',
		'ui.router',
		'monospaced.qrcode'
	]
).directive('convertToNumber', function () {
	return {
		require: 'ngModel',
		link: function (scope, element, attrs, ngModel) {
			ngModel.$parsers.push(function (val) {
				return parseInt(val, 10);
			});
			ngModel.$formatters.push(function (val) {
				return '' + val;
			});
		}
	};
});

quizModule.value("CONSTANTS", {
	QUIZ_THEME: QUIZ_THEME,
	QUIZ_TYPE: QUIZ_TYPE,
	QUESTION_TYPE: QUESTION_TYPE,
	QUESTION_STEP : QUESTION_STEP,
	PLAYER_MAXIMUM : PLAYER_MAXIMUM
});
quizModule.run(function ($rootScope, CONSTANTS) {
	$rootScope.CONSTANTS = CONSTANTS;
});