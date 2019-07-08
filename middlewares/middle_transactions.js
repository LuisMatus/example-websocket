var transactions_newModel = require("../models/Transactions_new.js");

module.exports = function (req, res, next) {

	transactions_newModel.find({ FECHA: { $gte: new Date('2020-5-01')} },{_id:0})
		.sort({ FECHA: -1 })
		.exec(function (err, transactions) {
			res.locals.transactions = transactions;
			next(); 
		});

	/*transactionsModel.findById(req.params.id)
		.exec(function (err, transactionsOne) {
			res.locals.transactionsOne = transactionsOne;
			next();
	});
	*/

}