var ROSLIB = require('roslib');

var sendData = function(latlon){
    var lats=[];
    var lons=[];
    let i=0;
    while(latlon[i]){
      lats[i]=latlon[i];
      lons[i]=latlon[i+5];
      i++;
    }
    var publisher = new ROSLIB.Topic({
      ros : window.ros,
      name : 'Autonomous',
      messageType : 'jetson/AutoPointNeuron2'
    });

    var sendmsg = new ROSLIB.Message({
      lat:lats,
      lon:lons,
      postOrGate:window.check,
      idLeft:window.idLeft,
      idRight:window.idRight,
      noOfCoords:i
    });
    
    publisher.publish(sendmsg);
}

module.exports.sendData = sendData;