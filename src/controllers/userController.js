var db = require('../models/data.js');
var User = require('../models/user.model.js');

module.exports.index =  function(req, res) {
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
};

module.exports.view = function view(req, res) {
    var userId = parseInt(req.params.userId);
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
};

module.exports.update = function update(req, res) {
    var userId = parseInt(req.params.userId);
    var userBonusPoints = parseInt(req.body.bonusPoints);

    User.findOne({"id": userId}).then(function(data){
        if(data) {
            User.update({"id": userId}, {"bonus_points" : (data.bonus_points + userBonusPoints)}).then(function(data){
                return res.json({
                    "status": "success",
                    "data": "user with id=" + userId + " has been updated successfully"
                });
            }).catch(function(err){
                console.log("in user update",err);
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