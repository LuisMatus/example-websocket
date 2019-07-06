var express = require('express');
var router = express.Router();

router.get('/get-data', function (req, res) {

	res.send('api v1');
});


module.exports = router;