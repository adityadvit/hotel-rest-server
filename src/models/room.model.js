
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var roomSchema = new Schema({
    id : Number,
    status: String,
    hotel_id: Number
}, {collection: 'rooms'});

module.exports = mongoose.model('room', roomSchema);