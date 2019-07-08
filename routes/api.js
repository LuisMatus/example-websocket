var express = require('express');
var router = express.Router();

var transactionsModel = require("../models/Transactions.js");
var transactions_newModel = require("../models/Transactions_new.js");

var io = require('socket.io');

router.post('/get-data', function (req, res) {
	
	return res.json({ 'status': "success", 'transactions': res.locals.transactions });
});

router.put('/transactions/:id', function (req, res) {

	transactions_newModel.findOne({'ID_TRASACCION': req.params.id}, function (err, doc) {

		if (err) return res.json({ 'status': "error" });


		doc.FECHA 		= req.body.FECHA;
		doc.ID_CLIENTE	 = req.body.ID_CLIENTE;
		doc.ID_ARTICULO = req.body.ID_ARTICULO;
		doc.CANTIDAD = req.body.CANTIDAD;
		doc.COSTO = req.body.COSTO;
		doc.PRECIO = req.body.PRECIO;


		doc.save(function () {

		});

	});
	req.app.io.emit('charts');
	return res.json({ 'status': "success" });

});

router.post('/charts', async function (req, res) {

	var fechas = [];
	var costo = [];
	var precio = [];
	/*{
			$match: { $and: [{ FECHA: { $gte: new Date('2019-01-01') } }, { FECHA: { $lte: new Date('2019-01-02') } }] },
	},*/
	var data_chart = await transactions_newModel.aggregate([
		{ $sort: { FECHA: -1 } },
		{ $limit: 20 },
		{ 
			$group: {
				_id: '$FECHA',
				costoTotal: {
					$sum: '$COSTO'
				},
				precioTotal: {
					$sum: '$PRECIO'
				}
			}
		}
		
	])
	.exec();
	//console.log(data_chart);

	var serie_costo = await data_chart.map((item)=>{

		fechas.push(item._id.toISOString().substring(0, 10));
		//costo.push(item.costoTotal);
		precio.push(item.precioTotal);
		return item.costoTotal;

	});

	return res.json({ 'status': "success", 'fechas': fechas, 'costo': serie_costo, 'precio': precio  });
});
/*
router.get('/convertir', function (req, res) {

	transactionsModel.
		find({}).
		cursor().
		on('data', function (doc) {
			var data_new = {
				ID_TRASACCION: parseInt(doc.ID_TRASACCION),
				FECHA: new Date(doc.FECHA),
				ID_CLIENTE: parseInt(doc.ID_CLIENTE),
				ID_ARTICULO: parseInt(doc.ID_ARTICULO),
				CANTIDAD: parseInt(doc.CANTIDAD),
				COSTO: parseInt(doc.COSTO),
				PRECIO: parseInt(doc.PRECIO)
			}

			var new_transactions = new transactions_newModel(data_new);

			new_transactions.save();
		}).
		on('end', function () { console.log('Done!'); });



	return res.json({ 'status': "success", 'transactions': res.locals.transactions });
});
*/






module.exports = router;