import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//Autonomous textfields
import Autofield from './Autofield';
//3dsimulator using yaw, pitch, roll
 import Tdsimulator from './3dsimulator';
//keyboard event for the whole body
import Keyboard from './keyboard';
//status bar displays heading, lat, lon and altitude
import Status from './statusBar';
//map for displaying location of the rover
import LeafletMap from './map';
//services
import Service from './service';
//For runtime drive update
import UpdateParameters from './updateParameters';
//Speedstatus right panel for left and right motor
import SpeedStatus from './monitorSpeed';
//footer for connection display
import Footer from './footer';
//compass left panel
import Compas from './compass';
//hidden slide panel
import SlidingPannel from './SlidePannel';
//stop watch timer
import Timer from './timer';
//Autonomous status
import StatusAuto from './StatusAuto';
//photon css
import '../css/vendor/photon-0.1.2-alpha/dist/css/photon.css';
import '../css/custom.css';

//all the components are being rendered in this render function and returned to index.js
export default class App extends Component {
	state = { 
  		armStatus: 0,
  		counter: 1,
  		start: 123,
  		point5:[]
	}  

//to render option 1.Drive, 2.Autonomous
	renderOpt = () =>{
		if(this.state.counter===1){
			document.getElementById("main").style.transition='2s';
			document.getElementById("main").style.backgroundColor="#e5e3e8";
			this.setState({counter:0});
			window.auto=true;
		}
		else{
			document.getElementById("main").style.transition='2s';
		  	document.getElementById("main").style.backgroundColor="#e5e3e8";
			this.setState({counter:1});
			window.auto=false;	
		}
	}

	armStat = (status) =>{
		this.setState({armStatus: status});
	}

//returns a class container and the components
	render() {
		return ((this.state.counter)===1?<div>
			<div className="window">
	         <div className="window-content">
	          <div className="pane-group" style={{border:'5px solid #485fa3'}}>
			   <div className="pane-one-fourth sidebar1" style={{borderRight:'5px solid #485fa3', overflowY: "hidden",overflowX: "hidden"}}>
				<div className="row">
					<div className="col-md-6" >
						<button onClick={this.renderOpt} style={{width:"80%", marginLeft:"5px"}} className="btn btn-large butn-info">Auto</button>
					</div>
					<div className="col-md-6">
					<Keyboard />
					</div>
				</div>
				<div style={{borderTop:'5px solid #485fa3', borderBottom:'5px solid #485fa3'}}>
				    <Status />
				</div>    
				    <Compas />
				    <Tdsimulator /> 
		        </div>
				<div className="pane" style={{borderRight:'5px solid #485fa3', overflowX:"hidden", overflowY:"hidden"}}>
				  <div style={{borderBottom:'5px solid #485fa3'}}>	
				  	<Timer/>
				  </div>
				  <LeafletMap state={this.state.counter} />
				  <div style={{borderTop:'5px solid #485fa3'}}> 	
				  	<Service counter = {this.state.counter} armStat = {this.armStat} />
				  </div>	
				</div>
			    <div className="pane-one-third sidebar2 col-md-3" style={{overflowX: "hidden", overflowY: "hidden"}}>
				<SlidingPannel/>
					<UpdateParameters/>
					<div style={{borderTop:'5px solid #485fa3', borderBottom:'5px solid #485fa3'}}>	
						<SpeedStatus/>
					</div>
				</div>
	          </div>
			  </div>
			  <Footer/>
			  </div>		
	      	</div> : 
	      	<div>
	      		<div className="window" id="main1">
	         <div className="window-content">
	          <div className="pane-group" style={{border:'5px solid #485fa3'}}>
			   <div className="pane-one-fourth sidebar1" style={{borderRight:'5px solid #485fa3', overflowX: "hidden", overflowY: "auto"}}>
				<div className="row">
					<div className="col-md-6">
						<button onClick={this.renderOpt} style={{width:"80%", marginLeft:"5px"}} className="btn btn-large butn-info">Drive</button>
					</div>
					<div className="col-md-6">
						<Keyboard />
					</div>
				</div>
				<div style={{borderTop:'5px solid #485fa3', borderBottom:'5px solid #485fa3'}}>
				    <Status />
				</div>    	
				    <Compas />
					<Autofield />	
		        </div>
				<div className="pane" style={{borderRight:'5px solid #485fa3', overflowX:"hidden", overflowY: "hidden"}}>
				  <div style={{borderBottom:'5px solid #485fa3'}}>
				  	<Timer/>
				  </div>	
				  <LeafletMap />
				  <div style={{borderTop:'5px solid #485fa3'}}>	 	
				  	<Service counter = {this.state.counter} armStat = {this.armStat}/>
				  </div>	
				</div>
			    <div className="pane-one-fourth sidebar2" style={{overflowX: "hidden", overflowY: "hidden"}}>
					<SlidingPannel/>
					<UpdateParameters/>
				<div style={{borderTop:'5px solid #485fa3', borderBottom:'5px solid #485fa3'}}>	
					<SpeedStatus/>
				</div>
				<div style={{borderBottom:'5px solid #485fa3'}}>	
					<StatusAuto counter={this.state.counter}/>
					<Tdsimulator/>
				</div>	
				</div>
	           
	          </div>
			  </div>
			  <Footer/>
			  </div>	
	      	</div>); 
	}
}
