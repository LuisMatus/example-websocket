const express = require('express')
var path = require('path');
const app = express()
const port = 3000

var api_routes 			= require('./routes/api.js');
var middleware_routes 	= require('./middlewares/middle_transactions.js');

//DB
var mongoose = require('mongoose');
mongoose.connect('mongodb://sails:123456@localhost:27017/api_google');

// Public Dir
app.use(express.static(path.join(__dirname, '/public')));
app.use("/public", express.static('public'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', function (req, res) {
	res.render('general/home');
});


app.use('/api/v1', api_routes);
app.use('/api/v1', middleware_routes);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

