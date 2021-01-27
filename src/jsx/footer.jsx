import React, { Component } from 'react';
var stat = require('../js/footer');
var armStatus = require('../js/armstatus');
var connInterval;

export default class Footer extends Component{
		
		componentDidMount() {
				stat.statusConnection();
				armStatus.joyStatus();
				connInterval = setInterval(function(){
					 var element = document.getElementById("footer");
					 var d= new Date();
					 var n= d.getTime();
					 if(n-window.n>1000){
						element.style.backgroundColor = "#5469a8";
					 }
					 else{
						element.style.backgroundColor = "#829bff";
					 }
				},500);
		}

		componentWillUnmount() {
				clearInterval(connInterval);
		}

		render(){
				return(<div>
						<div>
								<footer id="footer" className="toolbar toolbar-footer">
									<div className="row" style={{marginLeft:'20px', marginTop:'5px'}}>
										<div className="col-md-1">
									  		<div className='row'>
												<span id="ArmDiagTurn" className="dot" style={{margin: 'auto'}}></span>
											</div>
											<div className='row' style={{marginLeft:'25px'}}>
												<span style={{color:'#5469a8', fontSize:'20px'}}>Pitch Up</span>
											</div>
										</div>
										<div className="col-md-1">
									  		<div className='row'>	  
          										<span id="ArmDiagAcc1" className="dot" style={{margin: 'auto'}}></span>
											</div>
											<div className='row' style={{marginLeft:'25px'}}>
												<span style={{color:'#5469a8', fontSize:'20px'}}>Pitch Down</span>
											</div>
										</div>
										<div className="col-md-1">
									  		<div className='row'>
												<span id="ArmDiagAcc2" className="dot" style={{margin: 'auto'}}></span>
											</div>
											<div className='row' style={{marginLeft:'25px'}}>
												<span style={{color:'#5469a8', fontSize:'20px'}}>Roll Right</span>
											</div>
										</div>
										<div className="col-md-1">
									  		<div className='row'>
												<span id="ArmDiagYaw" className="dot" style={{margin: 'auto'}}></span>
											</div>
											<div className='row' style={{marginLeft:'25px'}}>
												<span style={{color:'#5469a8', fontSize:'20px'}}>Roll Left</span>
											</div>
										</div>
										<div className="col-md-1">
									  		<div className='row'>
												<span id="ArmDiagRoll" className="dot" style={{margin: 'auto'}}></span>
											</div>
											<div className='row' style={{marginLeft:'25px'}}>
												<span style={{color:'#5469a8', fontSize:'20px'}}>Gr Open</span>
											</div>
										</div>
										<div className="col-md-1">
									  		<div className='row'>	
												<span id="ArmDiagGripper" className="dot" style={{margin: 'auto'}}></span>
											</div>
											<div className='row' style={{marginLeft:'25px'}}>
												<span style={{color:'#5469a8', fontSize:'20px'}}>GrClose</span>
											</div>
										</div>
										<div className="col-md-1">
									  		<div className='row'>
												<span id='ArmDriveStatus' style={{marginLeft:'20px',marginTop:'10px' ,transition:'2s', color:'#5469a8', fontSize:'20px'}}></span>
											</div>
										</div>
									</div>
								</footer>
						</div>
				</div>
				);
		}
}



