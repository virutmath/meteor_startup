QuestionCollection = new Mongo.Collection("questions");

QuestionCollection.allow({
    insert: function (userId, question) {
        return true;
    },
    update: function (userId, question, fields, modifier) {
        return true;
    },
    remove: function (userId, question) {
        return true;
    }
});