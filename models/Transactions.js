var mongoose = require('mongoose');  

var transactions = mongoose.Schema({

	ID_TRASACCION: { type: String, required: true, unique: true },
	FECHA: Date,
	ID_CLIENTE: { type: Number, required: true},

	ID_ARTICULO: { type: Number, required: true },
	CANTIDAD: { type: Number, required: true },

	COSTO: { type: Number, required: true },
	PRECIO: { type: Number, required: true },

	//created: { type: Date, default: Date.now },
	//updated: { type: Date, default: Date.now },

});

var Transactions = mongoose.model('Transactions', transactions);

module.exports = Transactions;
