const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
	username: String,
	password: String
});

UserSchema.plugin(passportLocalMongoose);
// this is going to add to the 'UserSchema' a bunch of methods that come from that package (it takes care of hashing of passwords, etc.)

module.exports = mongoose.model('User', UserSchema);
