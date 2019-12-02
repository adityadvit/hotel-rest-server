var db = require('../models/data.js');

module.exports.index =  function(req, res) {
    res.json({
        "status": "success",
        "data": db.getRooms()
    });
};