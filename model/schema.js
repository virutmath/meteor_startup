var Schema = {};

Schema.Quiz = new SimpleSchema({
	title : {
		type : String,
		label : "Quiz title"
	},
	user : {
		type : String,
		label : "Owner of Quiz"
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
	}
});
QuizCollection.attachSchema(Schema.Quiz);

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