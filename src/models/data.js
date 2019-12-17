
var db = {};
db.users = [
    {   
        "id" : 1,
        "username" : "aditya",
        "phone" : 1234,
        "email" : "aditya1234@domain.com",
        "bonus_points" : 1500,
        "gender": "M"
    },
    {   
        "id" : 2,
        "username" : "ram",
        "phone" : 4321,
        "email" : "ram4321@domain.com",
        "bonus_points" : 2500,
        "gender": "M"
    },
    {   
        "id" : 3,
        "username" : "radha",
        "mobile" : 6789,
        "email" : "radha6789",
        "bonus_points" : 500,
        "gender": "F"
    }
];

db.hotels = [
    {
        "id" : 1,
        "room_price": 500,
        "name": "Taj mahal palace",
        "address": "Apollo bandar, colaba, Mumbai"
    },
    {
        "id" : 2,
        "room_price": 800,
        "name": "Hyatt regency",
        "address": "Hinjewadi phase1, Pune"
    }
];


db.rooms = [
    {
        "id": 1,
        "status": "AVAILABLE",
        "hotel_id": 1
    },
    {
        "id": 2,
        "status": "AVAILABLE",
        "hotel_id": 1
    },
    {
        "id": 3,
        "status": "BOOKED",
        "hotel_id": 1
    },
    {
        "id": 4,
        "status": "BOOKED",
        "hotel_id": 1
    },
    {
        "id": 5,
        "status": "BOOKED",
        "hotel_id": 1
    },
    {
        "id": 6,
        "status": "AVAILABLE",
        "hotel_id": 2
    },
    {
        "id": 7,
        "status": "AVAILABLE",
        "hotel_id": 2
    },
    {
        "id": 8,
        "status": "AVAILABLE",
        "hotel_id": 2
    },
    {
        "id": 9,
        "status": "BOOKED",
        "hotel_id": 2
    },
    {
        "id": 10,
        "status": "BOOKED",
        "hotel_id": 2
    },
    {
        "id": 11,
        "status": "AVAILABLE",
        "hotel_id": 3
    },
    {
        "id": 12,
        "status": "AVAILABLE",
        "hotel_id": 3
    },
    {
        "id": 13,
        "status": "AVAILABLE",
        "hotel_id": 3
    }
];

//Not used
db.bookings = [
    
];

module.exports = {
  roomStatus: {
    available: "AVAILABLE",
    booked: "BOOKED",
    pending_approval: "PENDING_APPROVAL"
  },
  
  getHotels: function(){
    return db.hotels;
  },
  
  getHotelById: function(hid) {
    var _hotel = null;
    _hotel = db.hotels.find(function(h) {
        if(h.id === hid) return h;
    });
    return _hotel;
  },
  
  getUsers: function() {
    return db.users;
  },
  
  getUserByUserName: function(uname) {
    var _user = null;
    _user = db.users.find(function(u){
        if(u.username == uname) return u;
    });
    return _user;
  },
  
  updateUserByUserName: function(uname, property, value){
      var _user = db.users.find(function(u){
          if(u.username == uname){
            u[property] = value;
            return u;
          } 
      });
      if(_user) return true;
      return false;
  },
  
  getRooms: function() {
    return db.rooms;
  },
  
  getRoomsWithStatusInHotelWithId: function(status, hid) {
    var _rooms = db.rooms.filter(function(r){
        if(r.status === status && r.hotel_id === hid) return r;
    });
    return _rooms;
  },
  
  updateRoomByRoomId: function(rid, property, value) {
      var room = db.rooms.find(function(r) {
            if(rid == r.id){
                r[property] = value;
                return r;
            }
        });
      if(room) return true;
      return false;
  }
};
