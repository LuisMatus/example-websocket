var transactionsModel = require("../models/Transactions.js");

module.exports = function (req, res, next) {

	transactionsModel.find({})
		.exec(function (err, transactions) {
			//console.log(err);
			res.locals.transactions = transactions;
		});

	transactionsModel.findById(req.params.id)
		.exec(function (err, transactionsOne) {
			res.locals.transactionsOne = transactionsOne;
			next();
		});

}