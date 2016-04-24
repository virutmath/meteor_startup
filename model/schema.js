var Schema = {};
Schema.User = new SimpleSchema({
	username: {
		type: String,
		optional: true
	},
	emails: {
		type: Array,
		optional: true
	},
	"emails.$": {
		label: 'error',
		type: Object,
		optional: true
	},
	"emails.$.address": {
		type: String,
		label: 'error address',
		regEx: SimpleSchema.RegEx.Email,
		optional: true
	},
	"emails.$.verified": {
		type: Boolean,
		optional: true
	},
	// Make sure this services field is in your schema if you're using any of the accounts packages
	services: {
		type: Object,
		optional: true,
		blackbox: true
	},
	//Using for alanning:roles : user role
	roles: {
		type: [String],
		optional: true
	}
});
Meteor.users.attachSchema(Schema.User);

Schema.QuizStatus = new SimpleSchema({
	label: {
		type: String
	},
	value: {
		type: Number
	}
});
Schema.Quiz = new SimpleSchema({
	title: {
		type: String,
		label: "Quiz title"
	},
	description: {
		type: String,
		optional: true
	},
	user: {
		type: String,
		label: "Owner of Quiz"
	},
	time: {
		type: Number,
		label: 'Time for question',
		max: 60
	},
	theme: {
		type: Number,
		label: 'Theme for Quiz'
	},
	shortUrl: {
		type: String,
		optional: true
	},
	type: {
		type: Number
	},
	createdAt: {
		type: Date
	},
	updatedAt: {
		type: Date
	},
	status: {
		type : Schema.QuizStatus,
		optional : true
	}
});
QuizCollection.attachSchema(Schema.Quiz);


Schema.Question = new SimpleSchema({
	content: {
		type: String,
		label: "Content is require"
	},
	quiz: {
		type: String,
		label: "Quiz of question is require"
	},
	number: {
		type: Number,
		label: "Order question is require"
	},
	answers: {
		type: [String],
		label: "Answers is require"
	},
	correctAnswer: {
		type: String,
		label: "Correct answer is require"
	},
	score: {
		type: Number,
		optional: true
	},
	type: {
		type: Number,
		optional: true
	},
	createdAt: {
		type: Date
	},
	updatedAt: {
		type: Date
	}
});
QuestionCollection.attachSchema(Schema.Question);

//schema for player
Schema.Player = new SimpleSchema({
	nickname: {
		type: String,
		label: 'Player \'s nickname'
	},
	quiz: {
		type: String,
		label: 'Quiz ID'
	},
	score: {
		type: Number,
		optional: true,
		defaultValue: 0
	},
	rank: {
		type: Number,
		optional: true,
		defaultValue: 0
	},
	knockout : {
		type : Boolean,
		defaultValue : false
	},
	createdAt : {
		type : Date
	}
});
PlayerCollection.attachSchema(Schema.Player);

//schema for player answer
Schema.PlayerAnswer = new SimpleSchema({
	player: {
		type: String,
		label: "Player ID"
	},
	question: {
		type: String,
		label: "Question ID"
	},
	answer: {
		type: String,
		label: 'Answer for question',
		optional: true,
		allowedValues: ['A', 'B', 'C', 'D']
	},
	point: {
		type: Number,
		label: 'Point for question',
		defaultValue: 0
	},
	correct: {
		type: Boolean,
		defaultValue: false
	}
});
PlayerAnswerCollection.attachSchema(Schema.PlayerAnswer);

Schema.QuestionStep = new SimpleSchema({
	quiz: {
		type: String,
		unique: true
	},
	question: {
		type: String,
		unique: true
	},
	questionNumber: {
		type: Number
	},
	step: {
		type: String
	},
	overtime: {
		type: Boolean,
		defaultValue: false
	},
	percent: {
		type: Object,
		optional: true
	},
	"percent.A": {
		type: Number,
		optional: true,
		decimal: true,
		defaultValue: 0
	},
	"percent.B": {
		type: Number,
		optional: true,
		decimal: true,
		defaultValue: 0
	},
	"percent.C": {
		type: Number,
		optional: true,
		decimal: true,
		defaultValue: 0
	},
	"percent.D": {
		type: Number,
		optional: true,
		decimal: true,
		defaultValue: 0
	},
	count: {
		type: Object,
		optional: true
	},
	"count.A": {
		type: Number,
		optional: true,
		defaultValue: 0
	},
	"count.B": {
		type: Number,
		optional: true,
		defaultValue: 0
	},
	"count.C": {
		type: Number,
		optional: true,
		defaultValue: 0
	},
	"count.D": {
		type: Number,
		optional: true,
		defaultValue: 0
	}
});
QuestionStepCollection.attachSchema(Schema.QuestionStep);