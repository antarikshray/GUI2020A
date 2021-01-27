var ROSLIB = require('roslib');

var send = function(value){

  var publisher = new ROSLIB.Topic({
      ros : window.ros,
      name : 'DriveParameters',
      messageType : 'jetson/DriveParameterNeuron'
  });

  var sendmsg = new ROSLIB.Message({
    accUp: parseFloat(value.accUp,10),
    accDown: parseFloat(value.accUp,10),
    maxSpeed: parseFloat(value.maxSpeed,10),
    offRegion: parseFloat(value.offRegion,10)
  });
    
  publisher.publish(sendmsg);
}

module.exports.send = send;
