var L = require('leaflet');
var ROSLIB = require('roslib');
var webS = require('../js/webSocket');

// function to setupand call ros websocket to receive gyro values
var oldPoint=0;
var pointA, pointB, counter=0;
var statusServer = function(){
  webS.crtwebSocket();
  var listener = new ROSLIB.Topic({
      ros : window.ros,
      name : '/fix',
      messageType : 'sensor_msgs/NavSatFix'
  });

  listener.subscribe(function(message) {
      document.getElementById("Latitude:").innerHTML = message.latitude;
      document.getElementById("Longitude:").innerHTML = message.longitude;
      document.getElementById("Altitude:").innerHTML = message.altitude;
      var map = document.querySelector('#map-id')._leaflet_map;
      if(counter===0) {
          pointA = new L.LatLng(message.latitude, message.longitude);
          counter=1;
      } else if(counter===1) { 
          pointB = new L.LatLng(message.latitude, message.longitude);
          var pointList = [pointA, pointB];
          var polylines = new L.Polyline(pointList, {
              color: 'green',
              weight: 2,
              opacity: 0.5,
              smoothFactor: 1
          });
          polylines.addTo(map);
          counter=2;
      } else {
          pointA=pointB;
          pointB = new L.LatLng(message.latitude, message.longitude);
          var pointList = [pointA, pointB];
          var polylines = new L.Polyline(pointList, {
              color: 'green',
              weight: 2,
              opacity: 0.5,
              smoothFactor: 1
          });
          polylines.addTo(map);
          window.lines.push(polylines);
      }
      L.Icon.Default.mergeOptions({
          iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
          iconUrl: require("leaflet/dist/images/marker-icon.png"),
          shadowUrl: require('leaflet/dist/images/marker-shadow.png')
      });

      if (oldPoint != 0)
        map.removeLayer(oldPoint);
      
      oldPoint = L.marker([message.latitude, message.longitude]);
      oldPoint = oldPoint.addTo(map);
  });
}

module.exports.statusServer = statusServer;