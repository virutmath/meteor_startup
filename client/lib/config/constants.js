APP_DOMAIN = window.location.hostname == 'localhost' ? 'http://localhost:3000' : 'http://' + window.location.hostname + ':3000/';
CRYPT_KEY = '123qfs234wEmghtp323DfArsdf';
MY_GOOGLEAPI_KEY = 'AIzaSyAB-1wiwiau6fMmJNZL0mb0TXkF4EMRhN0';
GOOGLEAPI_SHORTENER_URL = 'https://www.googleapis.com/urlshortener/v1/url?key=' + MY_GOOGLEAPI_KEY;

QUIZ_THEME = {
	light : 1,
	dark : 2
};
QUIZ_TYPE = {
	ranking : 1,
	knockout : 2
};
QUIZ_STATUS = {
	'playing': {label: 'Playing', value: 4},
	'pending': {label: 'Pending', value: 3},
	'finish': {label: 'Finish', value: 2},
	'active': {label: 'Public', value: 1},
	'not_active': {label: 'Not Active', value: 0}
};
QUESTION_TYPE = {
	text : 1,
	image : 2,
	textImage : 3,
	sound : 4,
	imageAll: 5
};
QUESTION_STEP = {
	QUESTION_START: 1,
	SHOW_ANSWER: 2,
	SHOW_ANSWER_STATISTIC: 3,
	SHOW_CORRECT_ANSWER: 4,
	QUIZ_FINISH: 5
};
PLAYER_MAXIMUM = 100;