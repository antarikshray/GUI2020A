var ROSLIB = require('roslib');
var counter=0;
var drive = { "w":false,"s":false,"a":false,"d":false };
var misc = { "1":false, "2":false , "3":false , "4":false , 
             "6":false, "7":false, "8":false, "9":false, "Shift":false, "ArrowRight":false, "ArrowDown":false, 
             "ArrowLeft":false, "ArrowUp":false, "j":false, "k":false, "l":false, "i":false, "o":false};
var ros;

var sendK = function(event, check){
  let f=0;
  if (drive.hasOwnProperty(event.key)&&check===2){
    drive[event.key] = true;
    f=1;
  }
    
  if (misc.hasOwnProperty(event.key)&&check===2){
    misc[event.key] = true;     
    f=2;
  }
  if (drive.hasOwnProperty(event.key)&&check===3){
    drive[event.key] = false;
    f=1;
  }
  if (misc.hasOwnProperty(event.key)&&check===3){
    misc[event.key] = false;
    f=2;
  }
  
  var outputd = "";   
  Object.keys(drive).forEach(function(key) {
      outputd += (drive[key] ? "1" : "0");
  });

  var outputm = "";   
  Object.keys(misc).forEach(function(key) {
      outputm += (misc[key] ? "1" : "0");
  });

  var publisher = new ROSLIB.Topic();
  var sendmsg = new ROSLIB.Message();
  if(f===1){
      publisher.ros = window.ros;
      publisher.name ='Drive/keyboard';
      publisher.messageType ='std_msgs/String';
      sendmsg.data = outputd;

      publisher.publish(sendmsg);
  }

  if(f===2){
    publisher.ros = window.ros;
    publisher.name = 'Arm/keyboard';
    publisher.messageType = 'std_msgs/String';
    sendmsg.data = outputm;
    
    publisher.publish(sendmsg);
  }
}

var emergencyStop = function() {
  var outputd="0000";
  var publisher = new ROSLIB.Topic();
  var sendmsg = new ROSLIB.Message();
  publisher.ros = window.ros;
  publisher.name ='Drive/keyboard';
  publisher.messageType ='std_msgs/String';
  sendmsg.data = outputd;
  publisher.publish(sendmsg);
}

module.exports.sendK = sendK;
module.exports.emergencyStop = emergencyStop;