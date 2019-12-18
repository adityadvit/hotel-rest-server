var db = require('../models/data.js');
var Room = require('../models/room.model.js');

module.exports.index =  async function(req, res) {
    try {
        var rooms = await Room.get();
        res.json({
            "status": "success",
            "data": rooms
        });
    } catch (error) {
        res.status(500)
        .json({
            "status": "failure",
            "data": null
        });
    }
 };

 module.exports.view = async function view(req, res) {
    var roomId = parseInt(req.params.roomId);
    try {
        var room = await Room.getById(roomId);
        if(room) {
            res.json({
                "status": "success",
                "data": room
            });
        } else {
            res.status(404)
            .json({
                "status" : "failure",
                "message" : "room with id=" + roomId + " not found"
            });    
        }
    } catch (error) {
        res.status(500)
        .json({
            "status": "failure",
            "data": null
        });
    }
};