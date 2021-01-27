import React, { Component } from 'react';
var sendParameters = require('../js/updateParameter');

var id = [" ","maxSpeed","accUp","offRegion"];
var label = [" ","Max Speed ","Accel Up ","Off Region "];
var max = [0,1.0,0.1,1];
var min = [0,0.1,0.001,0.1];
var step = [0,0.05,0.001,0.05];
var value = [0,0.5,0.02,0.1];
var idlabel = ['0','1','2','3'];


export default class UpdateParameters extends Component {     
    state = {
          accUp: 0.02,
          maxSpeed: 0.5,
          offRegion: 0.1
      };
      
      handleChanges = (event) => {
        this.setState({[event.target.id]: event.target.value});
        document.getElementById(event.target.title).innerHTML = (label[event.target.title]+event.target.value);
      }
   
   printThis = () => {
   var value=this.state;
   sendParameters.send(value);
   }


renderparameters(){
var parameters = [];
for (var i=0; i < 3 ; i++) {
      parameters.push(<div> 
    <div className="row"  style={{margin:"10px", color:'#ffffff'}}>
      <span id={idlabel[i+1]} > {label[i+1]}  </span>
    </div>
    <div className="row" style={{margin:"10px"}}>
      <input type="range" className="custom-range" title={idlabel[i+1]} style={{width:"100%"}} id={id[i+1]} min={min[i+1]}   
      max={max[i+1]} step={step[i+1]} Value={value[i+1]} color="orange" onChange={this.handleChanges} >
    </input>
    </div>
    </div>
      )
    }
    return parameters;
  }
//render and return the html tags to the main app  
    render() {
      return (
      <div>
        <div> 
        {this.renderparameters()}
         </div>
        <div >
        <button id="updateData" onClick={this.printThis}
          style={{width:'95%', margin:'10px', marginTop:'79px'}} 
          className="btn btn-sm butn-info">UPDATE OFFSETS
        </button>
       </div>
       </div> 
    );
  }
}
