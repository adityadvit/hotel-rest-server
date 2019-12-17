let router = require('express').Router();

router.get('/', function(req, res) {
    res.json({
        "status":"OK",
        "message": "This is hotel-rest-api server"
    });
});

// Import hotel controller
var hotelController = require('./hotelController');

// Import user controller
var userController = require('./userController');

// Import room controller
var roomController = require('./roomController');

router.route('/hotels')
    .get(hotelController.index);

router.route('/hotels/:hotelId')
    .get(hotelController.view)
    .put(hotelController.update);


router.route('/users/:userId')
    .get(userController.view)
    .put(userController.update);

router.route('/users')
    .get(userController.index);


router.route('/rooms')
    .get(roomController.index);

module.exports = router;
