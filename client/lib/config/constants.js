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
QUESTION_TYPE = {
	text : 1,
	image : 2,
	textImage : 3,
	sound : 4,
	imageAll: 5
};