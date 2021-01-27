import React, { Component } from 'react';
import { Line, Circle } from 'rc-progress';

var auto = require('../js/receiveGyro');


export default class StatusAuto extends Component {

   componentDidMount(){
       auto.AutoStat(this.props.counter);
       auto.ballDetect(this.props.counter);
   }

    render(){
        return(
            <div>
                <div className="row" style={{marginLeft:"80px"}}>
                    <span id="ballt1" className="dot" style={{backgroundColor:"#bbb"}}></span>
                    <span id="ballt2" className="dot" style={{backgroundColor:"#bbb"}}></span>
                    <span id="ballt3" className="dot" style={{backgroundColor:"#bbb"}}></span>
                    <span id="ballt4" className="dot" style={{backgroundColor:"#bbb"}}></span>
                    <span id="ballt5" className="dot" style={{backgroundColor:"#bbb"}}></span>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div id="distStat" style={{color:"#717275"}}>
                            Distance: 0 
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div id="diffStat" style={{color:"#717275"}}>
                            Difference: 0 
                        </div>
                    </div>    
                </div>    
                <div id="legStat" style={{margin:"5px", textAlign:'center', fontSize:'25px', color:window.color}}>
                    Leg: 0
                </div>
            </div>
        );
    }
}