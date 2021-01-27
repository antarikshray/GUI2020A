import React, { Component } from 'react';

var minutes=0, seconds=0, counter=0, mintVal;

export default class Timer extends Component {

    timer = (event) =>{
    	if(counter===0&&event.target.id==='timeStart'){
      	document.getElementById("timeStart").innerHTML="Stop";
        minutes=mintVal.value;
        seconds=0;
        this.timeInterval = setInterval(function(){
  	    	if(minutes>=0&&seconds>=0){
            if(seconds===0&&minutes>0){
  				    minutes--;
  				    seconds=60;}
              seconds--;
            }
            if(seconds<0){
              seconds=0;
              minutes=0;}
  			    document.getElementById("minutes").innerHTML=minutes+" : ";
  			    document.getElementById("seconds").innerHTML=seconds;
  	    	},1000);
        counter++;  	 	
      }

      else if(event.target.id==='timePause'){
        if(counter%2===1)
          {clearInterval(this.timeInterval);
           counter++;
           document.getElementById("timePause").innerHTML="Play";
           document.getElementById("timePause").className="btn btn-info";
            }
        
        else
          {this.timeInterval = setInterval(function(){
          if(minutes>=0&&seconds>=0){
            if(seconds===0&&minutes>0){
              minutes--;
              seconds=60;}
              seconds--;
            }
            if(seconds<0){
              seconds=0;
              minutes=0;}
            document.getElementById("minutes").innerHTML=minutes+" : ";
            document.getElementById("seconds").innerHTML=seconds;
          },1000);
            counter++;
            document.getElementById("timePause").innerHTML="Pause";
           document.getElementById("timePause").className="btn btn-default";
        }
      }

    	else if(counter>0&&event.target.id==='timeStart')
    		{document.getElementById("timeStart").innerHTML="Start";
          clearInterval(this.timeInterval);
          document.getElementById("minutes").innerHTML="0 ";
          document.getElementById("seconds").innerHTML=": 0";
          document.getElementById("timePause").innerHTML="Pause";
          document.getElementById("timePause").className="btn btn-default";
          counter=0;}
    }


	render(){
		return(
      <div>
      <div className="row">
        <div className="col-md-2" style={{marginLeft:'100px'}}>  
          <input type="text" placeholder="0" className="form-control" size='5' style={{margin:'10px', backgroundColor:'#8596c9', color:'#ffffff'}} ref={(input)=>{mintVal = input}}></input>
        </div>
        <div className="col-md-3">  
          <span style={{fontSize:'30px', color:'#8596c9'}} id="minutes"> 0 </span>
          <span style={{fontSize:'30px', color:'#8596c9'}} id="seconds">: 0 </span>
        </div>  
        <div className="col-md-1">
          <button className='btn btn-lg butn-info' id="timeStart" style={{position:'absolute', margin:'10px', paddingLeft:'15px', paddingRight:'15px', paddingBottom:'5px', paddingTop:'5px'}} onClick={this.timer}>
          Start
          </button>
        </div>
        <div className="col-md-1">
          <button className='btn btn-lg butn-default' id="timePause" style={{position:'absolute', margin:'10px', paddingLeft:'15px', paddingRight:'15px', paddingBottom:'5px', paddingTop:'5px'}} onClick={this.timer}>
          Pause
          </button>
        </div>  
      </div>  
      </div>
	 );
	}
}