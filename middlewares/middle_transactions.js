var transactions_newModel = require("../models/Transactions_new.js");

module.exports = function (req, res, next) {
	
	// FECHA: { $gte: new Date('2020-5-01')}
	/*transactions_newModel.find({},{_id:0})
		.sort({ FECHA: -1 })
		.exec(function (err, transactions) {
			res.locals.transactions = transactions;
			next(); 
		});*/
	console.log(req.params.year)

	transactions_newModel.aggregate([
		{
			$project: {
				year			: { $year: "$FECHA" },
				FECHA 			: '$FECHA',
				ID_TRASACCION	: '$ID_TRASACCION',
				ID_CLIENTE		: '$ID_CLIENTE',
				ID_ARTICULO		: '$ID_ARTICULO',
				CANTIDAD		: '$CANTIDAD',
				COSTO			: '$COSTO',
				PRECIO			: '$PRECIO',
			}
		},
		{ $match: { year: Number(req.params.year) } },
		{ $sort: { FECHA: -1 } },
	], function (err, transactions) { 
			
		if (transactions ){
			res.locals.transactions = transactions;
			next();
		}

	});

}