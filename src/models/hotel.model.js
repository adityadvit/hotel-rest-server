
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var hotelSchema = new Schema({
    id : Number,
    room_price: Number,
    name: String,
    address: String
}, {collection: 'hotels'});

module.exports = mongoose.model('hotel', hotelSchema);