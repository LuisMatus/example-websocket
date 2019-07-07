var transactionsModel = require("../models/Transactions.js");

module.exports = function (req, res, next) {

	transactionsModel.find({},{_id:0})
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