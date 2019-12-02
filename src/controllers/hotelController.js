
var db = require('../models/data.js');

module.exports.index =  function(req, res) {
    res.json({
        "status": "success",
        "data": db.getHotels()
    });
}

module.exports.view = function view(req, res) {
    var hotelId = parseInt(req.params.hotelId);
    /*
    var _hotel = db.hotels.filter(function(h) {
        if(h.id === hotel_id) return h;
    });
    if(_hotel.length){
        res.json({
            "status": "success",
            data: _hotel[0]
        })
    } else {
        res.status(404)
            .json({
                "status" : "failure",
                "message" : "Hotel with id=" + hotel_id + " not found"
            });
    }
    */
    var hotel = db.getHotelById(hotelId);
    if(hotel){
        res.json({
            "status": "success",
            data: hotel
        });
    } else {
        res.status(404)
            .json({
                "status" : "failure",
                "message" : "Hotel with id=" + hotelId + " not found"
            });
    }
}

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
    
    /*
    //TBD: Move data handling to the central place -- use models
    var _hotel = db.hotels.filter(function(h) {
        if(h.id === hotel_id) return h;
    });

    if(! _hotel.length){
        return res.status(404)
        .json({
            "status" : "failure",
            "message" : "Hotel with id=" + hotel_id + " not found"
        });
    }

    var _user = db.users.filter(function(u){
        if(u.username == username) return u;
    });

    if(! _user.length){
        return res.status(404)
        .json({
            "status" : "failure",
            "message" : "user with username=" + username + " not found"
        });
    }

    //Check if the hotel room/rooms are available
    var _availebeRooms = db.rooms.filter(function(r){
        if(r.status === "AVAILABLE" && r.hotel_id === hotel_id) return r;
    });

    if(!_availebeRooms.length){
        return res.status(428) //precondition required
        .json({
            "status": "failure",
            "message": "rooms not available in the hotel with id=" + hotel_id
        })
    }

    var _hotelPrice = _hotel[0].room_price;
    var _userBonusPoint = _user[0].bonus_points;
    var _roomToBeBooked = _availebeRooms[0];

    //TBD: craete new booking
    if(_userBonusPoint >= _hotelPrice){
        //update the room status to BOOKED
        db.rooms.find(function(r) {
            if((r.hotel_id == hotel_id) && (_roomToBeBooked.id == r.id)){
                r.status = "BOOKED";
                //break;
            }
        });
        //update user bonus points
        db.users.forEach(function(u){
            if(u.username == username){
                u.bonus_points = u.bonus_points - _hotelPrice;
                //break;
            }
        });
        console.log("users are",db.users);
        console.log("hotels are",db.hotels);
        console.log("rooms are", db.rooms);
        res.json({
            "result": "success",
            "message": username + " has successfully booked the room with id=" + _roomToBeBooked.id + 
                " in hotel named " + _hotel[0].name
        });
        
    } else {
        //update the room status to PENDING_APPROVAL
        db.rooms.forEach(function(r) {
            if((r.hotel_id == hotel_id) && (_roomToBeBooked.id == r.id)){
                r.status = "PENDING_APPROVAL";
                //break;
            }
        });
        //update user bonus points
        db.users.forEach(function(u){
            if(u.username == username){
                //Negative bonus points indicate points should be added by the user
                u.bonus_points = u.bonus_points - _hotelPrice;
                //break;
            }
        });
        console.log("users are",db.users);
        console.log("hotels are",db.hotels);
        console.log("rooms are", db.rooms);
        
        res.json({
            "result": "partial success",
            "message": username + " has to add" + _user[0].bonus_points + " bonus points to book the room with id=" + _roomToBeBooked.id + 
                " in hotel named " + _hotel[0].name
        });
    }
    */
    var _hotelToBeBooked = db.getHotelById(hotelId);
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
        
        console.log("users are",db.getUsers());
        console.log("hotels are",db.getHotels());
        console.log("rooms are", db.getRooms());
        
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
        
        console.log("users are",db.getUsers());
        console.log("hotels are",db.getHotels());
        console.log("rooms are", db.getRooms());
        
        res.json({
            "result": "Pending approval",
            "message": _currentUser.username + " has to add" + _currentUser.bonus_points + " bonus points to book the room with id=" + _roomToBeBooked.id + 
                " in hotel named " + _hotelToBeBooked.name
        });
    }
}

