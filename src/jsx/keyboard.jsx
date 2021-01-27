import React, { Component } from 'react';
var sendKey = require('../js/keysend');


export default class Keyboard extends Component{

//this constructor binds the event handler function triggers
	constructor(props) {
    super(props);
  
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyKill = this.handleKeyKill.bind(this);
    this.state = {
      counter: 1,
      start: 321
    };
  }

//this mounts the event to our component
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
    document.addEventListener('keyup', this.handleKeyKill);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
    document.removeEventListener('keyup', this.handleKeyKill);
  }
  
  keyStatus = (event) =>{
    if(this.state.counter===1)
    {
     this.setState({start: 123});
     document.getElementById("Spdmonitor").style.transition='2s';
     document.getElementById("Spdmonitor").style.backgroundColor="#03fc5a"; 
     document.getElementById("drivebtn").style.backgroundColor="#03fc5a"; 
     this.setState({counter:0});
    }

    else
    { 
     this.setState({start: 321}); 
     document.getElementById("Spdmonitor").style.transition='2s';
     document.getElementById("Spdmonitor").style.backgroundColor="#ff4d4d";  
     document.getElementById("drivebtn").style.backgroundColor="#485fa3";  
     this.setState({counter:1});
    }
  }

//these functions passes the keypress-event to the keyboard send file 
//when key is pressed this function is triggered
  handleKeyPress(event) {
  	if(this.state.start===123){
      sendKey.sendK(event, 2);
      if(event.key==='w'||event.key==='a'||event.key==='s'||event.key==='d'){
        document.getElementById("Spdmonitor").style.transition='6s';
        document.getElementById("Spdmonitor").style.backgroundColor="#ff0000";
      }
    }
    
    else
      console.log('stopped');
  
  }

//when key is left this function is triggered
  handleKeyKill(event) {
    
    if(this.state.start===123) {
  	sendKey.sendK(event, 3);
    document.getElementById("Spdmonitor").style.transition='3s';
    document.getElementById("Spdmonitor").style.backgroundColor="#32a852";
    }
  }

	render()
    {
      return (
      <div>
        <div>
          <button id="drivebtn" onClick={this.keyStatus} className="btn btn-large butn-info" style={{width:"80%"}}>Start</button>
        </div>  
      </div>  
    );
  }
}
