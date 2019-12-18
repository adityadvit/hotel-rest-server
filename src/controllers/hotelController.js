
var Hotel = require('../models/hotel.model.js');
var User = require('../models/user.model.js');
var Room = require('../models/room.model.js');

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

module.exports.update = async function(req, res) {
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
    
    var _hotelToBeBooked = null;
    try {
        _hotelToBeBooked = await Hotel.getById(hotelId);
    } catch (error) {
        console.log("Hotel with id=" + hotelId + " not found");
    }
    
    if(!_hotelToBeBooked){
        return res.status(404)
        .json({
            "status" : "failure",
            "message" : "Hotel with id=" + hotelId + " not found"
        });
    }
    
    var _currentUser = null;
    try {
        _currentUser = await User.getByUserName(userName);
    } catch (error) {
        console.log("user with username=" + userName + " not found");
    }

    if(!_currentUser) {
        return res.status(404)
        .json({
            "status" : "failure",
            "message" : "user with username=" + userName + " not found"
        });
    }
    
    var _availableRooms = [];
    try {
        _availableRooms = await Room.getRoomsWithStatusInaHotel("AVAILABLE", hotelId);
    } catch (error) {
        console.log("rooms not available in the hotel with id=" + hotelId, error);
    }
    
    if(!_availableRooms.length){
        return res.status(428) //precondition required
        .json({
            "status": "failure",
            "message": "rooms not available in the hotel with id=" + hotelId
        });
    }
    
    var _hotelPrice = _hotelToBeBooked.room_price;
    var _userBonusPoint = _currentUser.bonus_points;
    var _roomToBeBooked = _availableRooms[0];
    
    if(_userBonusPoint >= _hotelPrice){
        try {
            var data = {"bonus_points": _userBonusPoint - _hotelPrice}
            var result = await User.updateUserByUserName(_currentUser.username, data);
        } catch (error) {
            console.log("User bonus points update failed with error= ",error);
            return res.status(500) 
              .json({
                "status": "Booking failed",
                "message": "Not able to update bonus points for user " + _currentUser.username
            });
        }
    
        try {
            var data = {"status": "BOOKED"}
            var result = await Room.updateRoomById(_roomToBeBooked.id, data);
        } catch (error) {
            console.log("Not able to book the room with id=" + _roomToBeBooked.id + "in hotel named " + _hotelToBeBooked.name)
            return res.status(500) 
              .json({
                "status": "Booking failed",
                "message": "Not able to book the room with id=" + _roomToBeBooked.id + "in hotel named " + _hotelToBeBooked.name
            });
        }
                
        res.json({
            "result": "Booking successful",
            "message": _currentUser.username + " has successfully booked the room with id=" + _roomToBeBooked.id + 
                " in hotel named " + _hotelToBeBooked.name
        });
        
    } else {
        //update user bonus points.Might be negative

       try {
            var data = {"bonus_points": (_userBonusPoint - _hotelPrice)}
            var result = await User.updateUserByUserName(_currentUser.username, data);
        } catch (error) {
            console.log("User bonus points update failed with error= ",error);
            return res.status(500) 
            .json({
                "status": "Booking failed",
                "message": "Not able to update bonus points for user " + _currentUser.username
            });
        }

        //update the room status to PENDING_APPROVAL
       try {
            var data = {"status": "PENDING_APPROVAL"};
            var result = await Room.updateRoomById(_roomToBeBooked.id, data);
        } catch (error) {
            console.log("Not able to book the room with id=" + _roomToBeBooked.id + "in hotel named " + _hotelToBeBooked.name)
            return res.status(500) 
            .json({
                "status": "Booking failed",
                "message": "Not able to book the room with id=" + _roomToBeBooked.id + "in hotel named " + _hotelToBeBooked.name
            });
        }

        console.log("currentuser is", _currentUser);
        res.json({
            "result": "Pending approval",
            "message": _currentUser.username + " has to add" + (_currentUser.bonus_points) + " bonus points to book the room with id=" + _roomToBeBooked.id + 
                " in hotel named " + _hotelToBeBooked.name
        });
    }
}

