
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var userSchema = new Schema({
    id : Number,
    phone: Number,
    bonus_points: Number,
    username: String,
    email: String,
    gender: String,
}, {collection: 'users'});

module.exports = mongoose.model('user', userSchema);

