var express = require('express');
var router = express.Router();

var transactionsModel = require("../models/Transactions.js");
//var query = generalesModel.find({});

router.post('/get-data', function (req, res) {

	console.log('conver')

	/*transactionsModel.
		find({ ID_TRASACCION:'19051538' }).
		cursor().
		on('data', function (doc) {
			doc.ID_CLIENTE = parseInt(doc.ID_CLIENTE);
			doc.ID_ARTICULO = parseInt(doc.ID_ARTICULO);
			doc.CANTIDAD = parseInt(doc.CANTIDAD);
			doc.COSTO = parseInt(doc.COSTO);
			doc.PRECIO = parseInt(doc.PRECIO);
			
			//doc.FECHA = new Date(doc.FECHA);
			console.log(doc.FECHA);
			doc.save();
			console.log(doc.FECHA );
		}).
		on('end', function () { console.log('Done!'); });
		*/

	return res.json({ 'status': "success", 'transactions': res.locals.transactions });
});


module.exports = router;