let router = require('express').Router();

router.get('/', function(req, res) {
    res.json({
        "status":"OK",
        "message": "This is hotel-rest-api server"
    });
});

// Import hotel controller
var hotelController = require('./hotelController');

router.route('/hotels')
    .get(hotelController.index);


router.route('/hotels/:hotelId')
    .get(hotelController.view)
    .put(hotelController.update);

module.exports = router;
