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

module.exports.update = function update(req, res) {
    var userId = parseInt(req.params.userId);
    var userBonusPoints = parseInt(req.body.bonusPoints);

    //Use async-await to avoid callback hell
    User.findOne({"id": userId}).then(function(data){
        if(data) {
            User.update({"id": userId}, {"bonus_points" : (data.bonus_points + userBonusPoints)}).then(function(data){
                return res.json({
                    "status": "success",
                    "data": "user with id=" + userId + " has been updated successfully"
                });
            }).catch(function(err){
                return res.status(500)
                .json({
                    "status": "failure",
                    "data": "user with id=" + userId + " updation failed"
                });
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
    
};