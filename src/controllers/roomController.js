var db = require('../models/data.js');
var Room = require('../models/room.model.js');

/*
module.exports.index =  function(req, res) {
    res.json({
        "status": "success",
        "data": db.getRooms()
    });
};
*/

module.exports.index =  function(req, res) {
    Room.find().then(function(rooms){
         res.json({
             "status": "success",
             "data": rooms
         });
    }).catch(function(err) {
         res.status(500)
         .json({
             "status": "failure",
             "data": null
         });
    });
 };