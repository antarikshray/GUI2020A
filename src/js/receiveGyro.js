var ROSLIB = require('roslib');
var ctr=0;
var balls= ["ballt1","ballt2","ballt3","ballt4","ballt5"];

var setupServer = function(){
    var listener = new ROSLIB.Topic({
      ros : window.ros,
      name : '/imu_data',
      messageType : 'jetson/ImuNeuron'
    });
    
    listener.subscribe(function(message) {
      var mesagx = message.X;
      var mesagz = message.Y;
      var mesagy = message.heading;
      document.getElementById("Heading:").innerHTML = message.heading;
      window.x = mesagx;
      window.y = mesagy;
      window.z = mesagz;
    });
}

var AutoStat = function(stat){
  ctr=0;
  var autoStat = new ROSLIB.Topic({
    ros : window.ros,
    name : '/AutoStatus',
    messageType : 'jetson/AutoDistData'
  });

  autoStat.subscribe(function(message) {
    if(stat===0){
      console.log(message);
      document.getElementById("legStat").innerHTML = "Leg : "+ message.point;
      document.getElementById("distStat").innerHTML = "Distance : "+ message.distance.toPrecision(6);
      document.getElementById("diffStat").innerHTML = "Difference : "+ message.difference.toPrecision(5);
        if(message.point-window.point>0){
        window.distance=String(parseInt(window.distance)+25);
        ctr++;
        if(ctr==1){
          window.color="#deb500"
        }
        else if(ctr==2){
          window.color="#02bac7"
        }
        else if(ctr==3){
          window.color="#024ec7"
        }  
        else {
          window.color="#09db2c"
        }  
      }
      window.point = message.point;
    }
  });
}

var ballDetect = function(stat){
  var ball = new ROSLIB.Topic({
    ros : window.ros,
    name : '/TBstatus',
    messageType : 'jetson/ballNeuron'
  });

  ball.subscribe(function(message) {
    //console.log(message)
    //console.log(message.Rled[0]);
    if(stat===0){
      for(let i=0;i<5;i++){
        if(message.Rled[i]){
          console.log(document.getElementById(balls[i]));
          document.getElementById(balls[i]).style.backgroundColor="#27d111";
        }
        else if(!message.Rled[i]){
          document.getElementById(balls[i]).style.backgroundColor="#bbb";
        }
      }
    }
  });
}

module.exports.setupServer = setupServer;
module.exports.AutoStat = AutoStat;
module.exports.ballDetect = ballDetect;