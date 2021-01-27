import React, { Component } from 'react';
import { Color } from 'three';
//import Button from 'react-bootstrap/Button';
var speedFeedback = require('../js/monitorSpeed');

var id = [" ","LeftMotor","RightMotor","LeftActuator","RightActuator"];
var label = [" ","LeftMotor ","RightMotor ","LeftActuator ","RightActuator "];
var labelid = [" ","leftTag","rightTag","leftTagA","rightTagA"];
var max = [0,127,255,255,255];
var min = [0,0,127,0,0];
var step = [0,1,1,1,1];
var value = [0,64,192,0,0];


export default class SpeedStatus extends Component {

    componentDidMount() {
        speedFeedback.speed();
	}

renderparameters(){

var parameters = [];
for (var i=0; i < 4 ; i++) {
      parameters.push(<div>
    <div className="row" style={{margin:"10px", color:'#1b1c4f'}}>
      <span id={labelid[i+1]} >  {label[i+1]} </span>
    </div>
    <div className="row" style={{margin:"10px"}}>
      <input type="range" className="custom-range" style={{width:"100%"}} id={id[i+1]} min={min[i+1]} max={max[i+1]} step={step[i+1]} Value={value[i+1]}  >
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
        <div id="Spdmonitor" style={{backgroundColor:'#8596c9'}}>
        {this.renderparameters()}
        <div className="row" style={{marginLeft: '100px'}}>
          <span id="leftAccpin" className="dot"></span>
          <span id="rightAccpin" className="dot"></span>
        </div>
         </div>
        </div>
    );
  }
}
