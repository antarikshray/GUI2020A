var ROSLIB = require('roslib');
var emStop = require('../js/keysend');
var webS = require('../js/webSocket');

var idD=[" ","J247","DRIVE","ARM","STM","GPS","AUTO","ARMINV","CAMBOX","BIONODE","HDCAM","SDCAM","TBDETECT","BACK"];

var setupService = function(ser){

	var addTwoIntsClient = new ROSLIB.Service({
		ros : window.ros,
		name : '/spine_the_nodes',
		serviceType : 'jetson/spine'
	});
	var request = new ROSLIB.ServiceRequest({
		signal : ser
	});

	addTwoIntsClient.callService(request, function(result) {
		// console.log(result);
	});
		
	// 	var element=document.getElementById(idD[parseInt(result.pointer,10)]);
	// 	if(parseInt(result.response,10) > 0){
	// 		if(element){
	// 			element.value="start"; window.idV[parseInt(result.pointer,10)]="start"; 
	// 			element.className="btn btn-sm butn-success col-md-2";window.idC[parseInt(result.pointer,10)] = "btn btn-sm butn-success col-md-2"; 
	// 		}
	// 		else{
	// 			window.idV[parseInt(result.pointer,10)]="start";
	// 			window.idC[parseInt(result.pointer,10)] = "btn btn-sm butn-success col-md-2";
	// 		}
	// 	}

	// 	else if(parseInt(result.response,10) < 0) {
	// 		if(element){
	// 			element.value="stop"; window.idV[parseInt(result.pointer,10)]="stop";
	// 			element.className="btn btn-sm butn-info col-md-2"; window.idC[parseInt(result.pointer,10)] = "btn btn-sm butn-info col-md-2";
	// 		}
	// 		else{
	// 			window.idV[parseInt(result.pointer,10)]="stop";
	// 			window.idC[parseInt(result.pointer,10)] = "btn btn-sm butn-info col-md-2";
	// 		}
	// 	}

	// 	else{  	
	// 		if(element){
	// 			element.value="error"; window.idV[parseInt(result.pointer,10)]="error"; 
	// 			element.className="btn btn-sm btn-danger col-md-2"; window.idC[parseInt(result.pointer,10)] = "btn btn-sm btn-danger col-md-2";
	//     	}
	//     	else{
	//     		window.idV[parseInt(result.pointer,10)]="error";
	//     		window.idC[parseInt(result.pointer,10)] = "btn btn-sm btn-danger col-md-2";
	//     	}
	//     }
	// });
}	

var monitorNode = function(){
  	var listener = new ROSLIB.Topic({
      ros : window.ros,
      name : '/nodeMonitor',
      messageType : 'std_msgs/Int8MultiArray'
	});
	
	listener.subscribe(function(message) {
		console.log(message.data);
		for(let i=1; i<idD.length; i++){
			if(message.data[i]===-2)
				window.idC[i]="btn btn-sm butn-danger col-md-2";
			else if(message.data[i]===-3)
				window.idC[i]="btn btn-sm butn-err col-md-2";
			else if(message.data[i]===0)
				window.idC[i]="btn btn-sm butn-default col-md-2";
			else if(message.data[i]===1)
				window.idC[i]="btn btn-sm butn-success col-md-2";
			else if(message.data[i]===-1)
				window.idC[i]="btn btn-sm butn-info col-md-2";	
			
			if(document.getElementById(idD[i]))
				document.getElementById(idD[i]).className=window.idC[i];
		}
	});
}

module.exports.setupService = setupService;
module.exports.monitorNode = monitorNode;

