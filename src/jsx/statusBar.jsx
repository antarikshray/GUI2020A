import React, { Component} from 'react';
var status = require('../js/recvStatus');

var statusId=[" ","Heading:","Latitude:","Longitude:","Altitude:"];


export default class Status extends Component {
 
	componentDidMount() {
		status.statusServer();
	}
	
	renderStatus(){
		var status = [];
	    for(var i=0;i<4;i++){
			status.push(<div>
			<div className="row">
				<div className="col-md-6">
					<span style={{color:'#8596c9'}}>{statusId[i+1]}</span>
				</div>
				<div className="col-md-6">
					<span style={{color:'#8596c9'}} id={statusId[i+1]}></span>
				</div>
			</div>
			<br></br>		
			</div>)
		}
		return status;
	}
	render(){
		return(
		<div>
			
			<div>
				<br></br>
				{this.renderStatus()}
				<br></br>
			</div>
		</div>);
				
	}		
	
}