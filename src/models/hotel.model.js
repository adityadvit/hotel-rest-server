
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var hotelSchema = new Schema({
    id : Number,
    room_price: Number,
    name: String,
    address: String
}, {collection: 'hotels'});

//module.exports = mongoose.model('hotel', hotelSchema);

var Hotel = mongoose.model('hotel', hotelSchema);

module.exports.get = async function(){
    try {
        var hotels = await Hotel.find();
        return hotels;
    } catch(err) {
        throw new Error(err);   
    }        
}

module.exports.getById = async function(hotelId){
    try {
        var hotel = await Hotel.findOne({"id": hotelId});
        return hotel;
    } catch(err) {
        throw new Error(err);   
    }        
}