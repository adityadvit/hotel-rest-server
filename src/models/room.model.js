
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var roomSchema = new Schema({
    id : Number,
    status: String,
    hotel_id: Number
}, {collection: 'rooms'});

//module.exports = mongoose.model('room', roomSchema);

var Room = mongoose.model('room', roomSchema);

module.exports.get = async function(){
  try {
      var rooms = await Room.find();
      return rooms;
  } catch(err) {
      throw new Error(err);   
  }        
}

module.exports.getById = async function(roomId){
  try {
      var room = await Room.findOne({"id": roomId});
      return room;
  } catch(err) {
      throw new Error(err);   
  }        
}

module.exports.getRoomsWithStatusInaHotel = async function(status, id) {
  try {
    var rooms = await Room.find({"status": status, "hotel_id": id});
    return rooms;
  } catch(err) {
    throw new Error(err);   
  }
}