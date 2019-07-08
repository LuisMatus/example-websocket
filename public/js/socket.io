var socket = io();

socket.on('chat message', function(msg){
	console.log("update from server");
});
