var express = require('express');
var router = express.Router();

//var generalesModel = require('../models/Transactions');
//var query = generalesModel.find({});

router.post('/get-data', function (req, res) {

	console.log("matus");
	return res.json({ 'status': "success", 'transactions': res.locals.transactions });
});


module.exports = router;