var mongoose = require('mongoose');  

var transactions = mongoose.Schema({

	ID_TRASACCION: { type: String, required: true, unique: true },
	FECHA: String,
	ID_CLIENTE: String,

	ID_ARTICULO: String,
	CANTIDAD: String,

	COSTO: String,
	PRECIO: String,

	//created: { type: Date, default: Date.now },
	//updated: { type: Date, default: Date.now },

});

var Transactions = mongoose.model('Transactions', transactions);

module.exports = Transactions;
