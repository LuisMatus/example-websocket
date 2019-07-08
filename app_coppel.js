const express = require('express')
var path = require('path');
var cookieParser 	= require('cookie-parser');
var bodyParser 		= require('body-parser');
const app = express();
const port = 5000;

// routes 
var api_routes 			= require('./routes/api.js');
var middleware_routes 	= require('./middlewares/middle_transactions.js');


//DB
var mongoose = require('mongoose');
mongoose.connect('mongodb://root:5m20BX0Uz5@localhost:27017/coppel');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Public Dir
app.use(express.static(path.join(__dirname, '/public')));
app.use("/public", express.static('public'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', function (req, res) {
	res.render('general/home');
});
// route API
app.use('/api/v1', middleware_routes);
app.use('/api/v1', api_routes);






var io = require("socket.io")(app.listen(5000, "127.0.0.1"));
app.io = io;
io.on('connection', function (socket) {
	console.log('a user connected server');
	socket.emit('connection');
	//socket.emit('charts');
});


/*app.listen(port, function(){
	console.log('listening on *:5000');
});*/

