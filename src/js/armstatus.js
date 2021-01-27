var ROSLIB = require('roslib');

var joyStatus = function(){
  	var listener = new ROSLIB.Topic({
          ros : window.ros,
          name : '/Arm/joy',
          messageType : 'sensor_msgs/Joy'
    });

    listener.subscribe(function(message) {
        document.getElementById('ArmDriveStatus').innerHTML = "Arm";
    });
  
    var listener2 = new ROSLIB.Topic({
        ros : window.ros,
        name : '/Drive/joy',
        messageType : 'sensor_msgs/Joy'
    });

    listener2.subscribe(function(message) {
        document.getElementById('ArmDriveStatus').innerHTML = "Drive";
    });
}

module.exports.joyStatus = joyStatus;