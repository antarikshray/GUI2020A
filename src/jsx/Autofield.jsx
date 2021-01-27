import React, { Component } from 'react';
import L from "leaflet";
var sndauto = require('../js/sendAuto');
const arrsize=5;
var basl = ["ball0","ball1","ball2","ball3","ball4"];
var pointA, pointB;
var newarr =
	[
	{ id:1, Latdeg:'' , Latmin:'' , Latsec:'', Lngdeg:'' , Lngmin:'' , Lngsec:'' },
	{ id:2, Latdeg:'' , Latmin:'' , Latsec:'', Lngdeg:'' , Lngmin:'' , Lngsec:'' },
	{ id:3, Latdeg:'' , Latmin:'' , Latsec:'', Lngdeg:'' , Lngmin:'' , Lngsec:'' },
	{ id:4, Latdeg:'' , Latmin:'' , Latsec:'', Lngdeg:'' , Lngmin:'' , Lngsec:'' },
	{ id:5, Latdeg:'' , Latmin:'' , Latsec:'', Lngdeg:'' , Lngmin:'' , Lngsec:'' }
	];


export default class Autofield extends Component {
	constructor(props){
		super(props);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.state = {
			value: '',
			clrAuto: 0,
			latlon :[
				{ id:1, Latdeg:'' , Latmin:'' , Latsec:'', Lngdeg:'' , Lngmin:'' , Lngsec:'' },
				{ id:2, Latdeg:'' , Latmin:'' , Latsec:'', Lngdeg:'' , Lngmin:'' , Lngsec:'' },
				{ id:3, Latdeg:'' , Latmin:'' , Latsec:'', Lngdeg:'' , Lngmin:'' , Lngsec:'' },
				{ id:4, Latdeg:'' , Latmin:'' , Latsec:'', Lngdeg:'' , Lngmin:'' , Lngsec:'' },
				{ id:5, Latdeg:'' , Latmin:'' , Latsec:'', Lngdeg:'' , Lngmin:'' , Lngsec:'' }
				]
		  };
	}

componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
}

componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
}

//this function on click of send updates the newarr values and then the array sends the value to rover.
calculate = (latlon)=>{
  var cvtLatLon = [];
  var ctr=0;
	 for(var i=0;i<arrsize;i++){
		if(latlon[i].Latdeg){
			cvtLatLon[ctr]=parseFloat(latlon[i].Latdeg)+(parseFloat(latlon[i].Latmin)/60)+(parseFloat(latlon[i].Latsec)/3600);
			cvtLatLon[arrsize+ctr]=parseFloat(latlon[i].Lngdeg)+(parseFloat(latlon[i].Lngmin)/60)+(parseFloat(latlon[i].Lngsec)/3600);
			ctr++;
		}	
	};
	while(arrsize-ctr){
		cvtLatLon[ctr]=0;
		cvtLatLon[arrsize+ctr]=0;
		ctr++;
	}
	  return cvtLatLon;
}

updval = () => {
	document.getElementById("main1").style.backgroundColor="#fdf500";
	var newarr2 = [...this.state.latlon];
	for(let i=0;i<arrsize;i++){
		 newarr2[i].Latdeg=newarr[i].Latdeg.value;
    	 newarr2[i].Latmin=newarr[i].Latmin.value;
		 newarr2[i].Latsec=newarr[i].Latsec.value;
		 newarr2[i].Lngdeg=newarr[i].Lngdeg.value;
    	 newarr2[i].Lngmin=newarr[i].Lngmin.value;
		 newarr2[i].Lngsec=newarr[i].Lngsec.value;
		}
   for(var j=0;j<arrsize;j++){
		newarr2[j].Latdeg = newarr2[j].Latdeg || 0;
		newarr2[j].Latmin = newarr2[j].Latmin || 0;	
		newarr2[j].Latsec = newarr2[j].Latsec || 0;
		newarr2[j].Lngdeg = newarr2[j].Lngdeg || 0;
		newarr2[j].Lngmin = newarr2[j].Lngmin || 0;
		newarr2[j].Lngsec = newarr2[j].Lngsec || 0;
   }

   this.setState({latlon : newarr2});
}

emptyArray = () =>{
    var newarr2 = [...this.state.latlon];
    for(let i=0;i<arrsize;i++){
		newarr2[i].Latdeg = -1.0;
		newarr2[i].Latmin = 0;
		newarr2[i].Latsec = 0;
		newarr2[i].Lngdeg = -1.0;
		newarr2[i].Lngmin = 0;
		newarr2[i].Lngsec = 0;
	}
    this.setState({latlon : newarr2});
}

clearFields = () =>{
	var map = document.querySelector('#map-id')._leaflet_map;
	this.updval();
	for(var i=0;i<arrsize;i++){
		document.getElementById("latd" + i).value=null;
		document.getElementById("latm" + i).value=null;
		document.getElementById("lats" + i).value=null;
		document.getElementById("lngd" + i).value=null;
		document.getElementById("lngm" + i).value=null;
		document.getElementById("lngs" + i).value=null;	
		if(window.point5[i]){
			map.removeLayer(window.point5[i]);
		}
		
		if(window.lines[i])
			map.removeLayer(window.lines[i]);
	}
	window.ctr=0;
}//this function is used to empty the new array

clearStop = (event) => {
	if(event.target.id==="clear"){
		pointA=0;
		pointB=0;
		document.getElementById("main1").style.backgroundColor="#fff5cc";	
		this.emptyArray();
		this.clearFields();
	}
	
	else if(event.target.id==="stop"){
		document.getElementById("main1").style.backgroundColor="#fff5cc";	
		this.emptyArray();
		sndauto.sendData(this.calculate(this.state.latlon));
	}
	window.point5 = [];
}

show = () =>{
  var a =this.calculate(this.state.latlon);
  var map = document.querySelector('#map-id')._leaflet_map;
  			
  for (var i = 0; i < arrsize; i++) {
	if (a[i] && a[arrsize+i]) {
		if (window.point5[i])
			map.removeLayer(window.point5[i]);
			window.point5[i] = L.marker([a[i],a[arrsize+i]]); 			
			 			L.Icon.Default.mergeOptions({
                            iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
                            iconUrl: require("../images/"+window.loc[window.ctr%5]),
                            shadowUrl: require('leaflet/dist/images/marker-shadow.png')
                        });
                    window.ctr++;
			window.point5[i].addTo(map);
			if(i!=arrsize-1) {
				pointA = new L.LatLng(a[i], a[arrsize+i]);
				pointB = new L.LatLng(a[i+1], a[arrsize+i+1]);
				var pointList = [pointA, pointB];

				var polylines = new L.Polyline(pointList, {
				    color: 'red',
				    weight: 3,
				    opacity: 0.5,
				    smoothFactor: 1
				});
				window.lines.push(polylines);
				polylines.addTo(map);
			}	
		}
	}	
}

handleKeyPress(event){
	if(event.key===" ")
		{this.emptyArray();
		 this.clearFields();
		 document.getElementById("main1").style.backgroundColor="#fff5cc";
		}
}

handleChangeChk = (event) => {
	console.log(event.target.id);
	for(let i=0;i<5;i++){
		if(window.check[i]==1&&event.target.id===basl[i]){
			window.check[i]=0;
			console.log(window.check);
		}	
		else if(window.check[i]==0&&event.target.id===basl[i]){
			window.check[i]=1;
			console.log(window.check);
		}	
	}
}

//start autonomous by sending values
startAuto = () =>{
	document.getElementById("main1").style.backgroundColor="#21c445"
	sndauto.sendData(this.calculate(this.state.latlon));
}

inputFields(){
// var wayPoints = [];
var wayPoints=[];
for(let i=0;i<arrsize;i++){
	wayPoints.push(<div>
		<div className="row">
			<div className="col-md-4 lat">
				<input id={"latd"+i}   type="text" className="form-control" placeholder="Latdeg" ref={(input)=>{newarr[i].Latdeg = input}}/>
			</div>
			<div class="col-md-3 lat">
				<input id={"latm"+i}  type="text"  className="form-control" placeholder="Latmin" ref = {(input)=>{newarr[i].Latmin = input}}/>
			</div>
			<div class="col-md-3 lat">
				<input id={"lats"+i}  type="text"  className="form-control" placeholder="Latsec" ref = {(input)=>{newarr[i].Latsec = input}}/>
			</div>
			<div class="col-md-1 custom-control custom-checkbox">
				<input id={"ball"+i} type="checkbox" style={{height:"20px", width:"20px"}} defaultChecked={window.check[i]} onChange={this.handleChangeChk} />
			</div>
		</div>
		<div className="row">
			<div className="col-md-4 long">
				<input id={"lngd"+i} type="text"  className="form-control" placeholder="Lngdeg"  ref = {(input)=>{newarr[i].Lngdeg = input}}/>
			</div>
			<div class="col-md-3 long">
				<input id={"lngm"+i}  type="text"  className="form-control" placeholder="Lngmin"  ref = {(input)=>{newarr[i].Lngmin = input}}/>
			</div>
			<div class="col-md-3 long">
				<input id={"lngs"+i}  type="text"  className="form-control" placeholder="Lngsec"  ref = {(input)=>{newarr[i].Lngsec = input}}/>
			</div>
	    </div>
	</div>)
}
	return wayPoints;
}
			
//the form and buttons are laid out
render(){
		return(
		<div>
			<div style={{paddingTop:"5px"}}>
			  {this.inputFields()}
			</div>
			<div className="row">
				<div className="col-md-4">
					<button onClick={this.updval} style={{width:"100%"}} className="btn btn-sm btn-default">Update</button>			
				</div>
				<div className="col-md-4">
					<button onClick={this.startAuto} style={{width:"100%"}} className="btn btn-sm btn-secondary">Send</button>
				</div>
				<div className="col-md-4">
					<button onClick={this.show} style={{width:"100%"}} className="btn btn-sm btn-default">Show </button>
				</div>
			</div>
			<div className="row">
				<div className="col-md-6">
					<button id="clear"onClick={this.clearStop} style={{width:"100%"}} className="btn btn-sm btn-dark">clear</button>			
				</div>
				<div className="col-md-6">
					<button id="stop" onClick={this.clearStop} style={{width:"100%"}} className="btn btn-sm btn-negative">Stop</button>
				</div>
			</div>
      	</div>
	);
	}	
}