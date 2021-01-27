var ROSLIB = require('roslib');

var errorROS = function(){
  var listener = new ROSLIB.Topic({
      ros : window.ros,
      name : '/rosout_agg',
      messageType : 'rosgraph_msgs/Log'
  });

  listener.subscribe(function(message) {
      if(message.level===8||message.level===16){
          document.getElementById("errorField").style.color = "red";
          window.log.push("!"+message.msg);
          document.getElementById("errorField").innerHTML = message.msg;
      }

      else if(message.level===2){
          document.getElementById("errorField").style.color = "white";
          window.log.push("$"+message.msg);
          document.getElementById("errorField").innerHTML = message.msg;
      }
          
      else{
          window.log.push("*"+message.msg);
      }  
  });
}

module.exports.errorROS = errorROS;