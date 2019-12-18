var db = require('../models/data.js');
var User = require('../models/user.model.js');

module.exports.index =  async function(req, res) {
    /*
    User.find().then(function(users){
        res.json({
            "status": "success",
            "data": users
        });
   }).catch(function(err) {
        res.status(500)
        .json({
            "status": "failure",
            "data": null
        });
   });
   */
    try {
        var users = await User.get();
        res.json({
            "status": "success",
            "data": users
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
    var userId = parseInt(req.params.userId);
    /*
    User.findOne({"id": userId}).then(function(data){
        if(data) {
            res.json({
                "status": "success",
                "data": data
            });
        } else {
            res.status(404)
            .json({
                "status" : "failure",
                "message" : "user with id=" + userId + " not found"
            });    
        }
        
    }).catch(function(err) {
        res.status(500)
        .json({
            "status": "failure",
            "data": null
        });
    });
    */
   try {
        var user = await User.getById(userId);
        if(user) {
            res.json({
                "status": "success",
                "data": user
            });
        } else {
            res.status(404)
            .json({
                "status" : "failure",
                "message" : "user with id=" + userId + " not found"
            });    
        }
    } catch (error) {
        console.log("In get user by id", error);
        res.status(500)
        .json({
            "status": "failure",
            "data": null
        });
    }
};

module.exports.update = async function update(req, res) {
    var userId = parseInt(req.params.userId);
    var userBonusPoints = parseInt(req.body.bonus_points);
    var user = null;
    try {
        user = await User.getById(userId);
        if(!user) {
            return res.status(404)
            .json({
                "status" : "failure",
                "message" : "user with id=" + userId + " not found"
            });    
        }
    } catch (error) {
        return res.status(500)
        .json({
            "status": "failure",
            "data": null
        });
    }

    try {
        var data = {"bonus_points": (user.bonus_points + userBonusPoints)};
        var result = await User.updateUserByUserName(user.username, data);
        return res.json({
            "status": "success",
            "data": data
        });
    } catch (error) {
        console.log("User update failed with error= ",error);
        return res.status(500) 
          .json({
            "status": "User update failed",
            "message": "User updated failed for user " + user.username
        });
    }
};