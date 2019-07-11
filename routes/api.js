var express = require('express');
var router = express.Router();

var transactionsModel = require("../models/Transactions.js");
var transactions_newModel = require("../models/Transactions_new.js");

var io = require('socket.io');

router.post('/get-data/:year', function (req, res) {
	
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


		doc.save(function (err, doc) {
			if(err){
				req.app.io.emit('charts');
				return res.json({ 'status': "error" });

			}
			let year=doc.FECHA.toISOString().substring(0, 4);
			req.app.io.emit('charts',year);
			return res.json({ 'status': "success" });

		});

	});
	

});

router.post('/charts', async function (req, res) {

;
	var years = [];

	var data_years =  await transactions_newModel.aggregate([
		{ $sort: { FECHA: -1 } },
		{
			$group: {
				_id: {$year:"$FECHA"}
			}
		},
		{ $sort: { _id: 1 } },
	]).exec();

	years = await data_years.map((item) => { 
		return item._id 
	} );
	let json_response = {
		'years': years
	}

	return res.json(json_response);
});

router.post('/charts/:year', async function (req, res) {

	var fechas = [];
	var precio = [];

	var data_chart = await transactions_newModel.aggregate([
		{
			$project: {
				year: { $year: "$FECHA" },
				FECHA: '$FECHA',
				COSTO: '$COSTO',
				PRECIO: '$PRECIO',
				count: { $sum: 1 },
			}
		},
		{ $match: { year: Number(req.params.year) } },
		{ $sort: { _id: 1 } },
		{
			$group: {
				_id: { $week: "$FECHA" },
				costoTotal: { $sum: '$COSTO' },
				precioTotal: { $sum: '$PRECIO' }
			}
		},
		{ $sort: { _id: 1 } },
	]).exec();

	var serie_costo = await data_chart.map((item)=>{
		fechas.push(item._id);
		precio.push(item.precioTotal);
		return item.costoTotal;
	});

	let json_response = { 
		'status': "success", 
		'fechas': fechas, 
		'costo': serie_costo, 
		'precio': precio,
	}
	return res.json(json_response);
});

/*
router.post('/charts-week', async function (req, res) {
	var data_chart = await transactions_newModel.aggregate([
		{ $project: { _id: 0 } }, 
		{ $sort: { FECHA: 1 } }, 
		{ 
			$group:{ 
				_id: { 
					year: { $year: "$FECHA" } , 
					week: { $week: "$FECHA" } 
				},
				costoTotal: { $sum: '$COSTO' },
				precioTotal: { $sum: '$PRECIO' }
			}
		},
		{ $sort: { _id: 1 } }, 
	]).exec();

	res.send(data_chart);
});	

router.post('/convertir', function (req, res) {

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