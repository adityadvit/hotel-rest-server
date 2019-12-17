
//var db = require('../models/data.js');
var Hotel = require('../models/hotel.model.js');

module.exports.index =  async function(req, res) {
    try {
        console.log("In index try");
        var hotels = await Hotel.get();
        res.json({
            "status": "success",
            "data": hotels
        });
    } catch (error) {
        console.log("In getHotels", error);
        res.status(500)
        .json({
            "status": "failure",
            "data": null
        });
    }
};

module.exports.view = async function view(req, res) {
    var hotelId = parseInt(req.params.hotelId);
    try {
        var hotel = await Hotel.getById(hotelId);
        if(hotel) {
            res.json({
                "status": "success",
                "data": hotel
            });
        } else {
            res.status(404)
            .json({
                "status" : "failure",
                "message" : "Hotel with id=" + hotelId + " not found"
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

module.exports.update = function(req, res) {
    var hotelId = parseInt(req.params.hotelId);
    var userName = req.body.username;
    
    if(hotelId == "" || hotelId == null ) {
        res.status(400)
        .json({
            "status": "failure",
            "message" : "hotel id is null"
        });    
    }
    if(userName == "" || userName == null ) {
        return res.status(400)
        .json({
            "status": "failure",
            "message" : "username is null"
        });    
    }
    
    //var _hotelToBeBooked = db.getHotelById(hotelId);
    var _hotelToBeBooked = Hotel.find()
    if(!_hotelToBeBooked){
        return res.status(404)
        .json({
            "status" : "failure",
            "message" : "Hotel with id=" + hotelId + " not found"
        });
    }
    
    var _currentUser = db.getUserByUserName(userName);
    if(!_currentUser) {
        return res.status(404)
        .json({
            "status" : "failure",
            "message" : "user with username=" + userName + " not found"
        });
    }
    
    var _availebeRooms = db.getRoomsWithStatusInHotelWithId(db.roomStatus.available, hotelId);
    
    console.log("available rooms are", _availebeRooms);
    
    if(!_availebeRooms.length){
        return res.status(428) //precondition required
        .json({
            "status": "failure",
            "message": "rooms not available in the hotel with id=" + hotelId
        });
    }
    
    var _hotelPrice = _hotelToBeBooked.room_price;
    var _userBonusPoint = _currentUser.bonus_points;
    var _roomToBeBooked = _availebeRooms[0];
    
    if(_userBonusPoint >= _hotelPrice){
        console.log("coming in first if");
        //update user bonus points
        var result = db.updateUserByUserName(_currentUser.username, "bonus_points",(_userBonusPoint - _hotelPrice));
        if(!result) {
            return res.status(500) 
              .json({
                "status": "Booking failed",
                "message": "Not able to update bonus points for user " + _currentUser.username
            });
        }
        
        //update the room status to BOOKED
        var result = db.updateRoomByRoomId(_roomToBeBooked.id, "status", db.roomStatus.booked);
        if(!result) {
            return res.status(500) 
              .json({
                "status": "Booking failed",
                "message": "Not able to book the room with id=" + _roomToBeBooked.id + "in hotel named " + _hotelToBeBooked.name
            });
        }
        
        //console.log("users are",db.getUsers());
        //console.log("hotels are",db.getHotels());
        //console.log("rooms are", db.getRooms());
        
        res.json({
            "result": "Booking successful",
            "message": _currentUser.username + " has successfully booked the room with id=" + _roomToBeBooked.id + 
                " in hotel named " + _hotelToBeBooked.name
        });
        
    } else {
        //update user bonus points.Might be negative
        var result = db.updateUserByUserName(_currentUser.username, "bonus_points",(_userBonusPoint - _hotelPrice));
        if(!result) {
            return res.status(500) 
              .json({
                "status": "Booking failed",
                "message": "Not able to update bonus points for user " + _currentUser.username
            });
        }
        
        //update the room status to BOOKED
        var result = db.updateRoomByRoomId(_roomToBeBooked.id, "status", db.roomStatus.pending_approval);
        if(!result) {
            return res.status(500) 
              .json({
                "status": "Booking failed",
                "message": "Not able to book the room with id=" + _roomToBeBooked.id + "in hotel named " + _hotelToBeBooked.name
            });
        }
        
        //console.log("users are",db.getUsers());
        //console.log("hotels are",db.getHotels());
        //console.log("rooms are", db.getRooms());
        
        res.json({
            "result": "Pending approval",
            "message": _currentUser.username + " has to add" + _currentUser.bonus_points + " bonus points to book the room with id=" + _roomToBeBooked.id + 
                " in hotel named " + _hotelToBeBooked.name
        });
    }
}

