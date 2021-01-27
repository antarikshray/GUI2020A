var ROSLIB = require('roslib');

var speed = function(){
	var listener = new ROSLIB.Topic({
    	ros : window.ros,
    	name : '/drive_data',
    	messageType : 'jetson/DriveNeuron'
  	});

		var listener2 = new ROSLIB.Topic({
	    	ros : window.ros,
	    	name : '/arm_data',
	    	messageType : 'jetson/ArmNeuronStm2'
	  	});

	listener.subscribe(function(message) {
    	document.getElementById("LeftMotor").value = message.channel1;
    	document.getElementById("leftTag").innerHTML ="Left Motor "+ message.channel1;

   		document.getElementById("RightMotor").value = message.channel2;
    	document.getElementById("rightTag").innerHTML ="Right Motor "+ message.channel2;

	});

	listener2.subscribe(function(message) {

			document.getElementById("LeftActuator").value = message.la1Pwm;
    	document.getElementById("leftTagA").innerHTML ="Left Motor "+ message.la1Pwm;

			document.getElementById("RightActuator").value = message.la2Pwm;
		document.getElementById("rightTagA").innerHTML ="Right Motor "+ message.la2Pwm;
		if(message.ttPin2==1){
			document.getElementById("leftAccpin").style.backgroundColor = '#27d111';
		}
		if(message.ttPin1==1){
			document.getElementById("rightAccpin").style.backgroundColor = '#27d111';
		}
		if(message.ttPin2==0){
			document.getElementById("leftAccpin").style.backgroundColor = '#bbb';
		}
		if(message.ttPin1==0){
			document.getElementById("rightAccpin").style.backgroundColor = '#bbb';
		}
	});
}

module.exports.speed = speed;
