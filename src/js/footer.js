var ROSLIB = require('roslib');

var statusConnection = function(){
	var listener = new ROSLIB.Topic({
        ros : window.ros,
        name : '/ConnectionData',
        messageType : 'jetson/ConnectionNeuronGui'
    });

	listener.subscribe(function(message) {
		var d = new Date();
		window.n = d.getTime();
	});
}

module.exports.statusConnection = statusConnection;