import React, { Component } from 'react';

class Compas extends Component {
  
componentDidMount() {
  var dir = -28;
  var bear = 0;
  this.myInterval = setInterval(function(){
    dir = -28+window.y;
    var compassDisc = document.getElementById("Needle");
    compassDisc.style.webkitTransform = "rotate("+ (dir) +"deg)";
    compassDisc.style.transform = "rotate("+ (dir) +"deg)";
  
    bear = -24;
    bear = -24+window.y+window.difference;
    var bearNeedle = document.getElementById("bearneedle");
    bearNeedle.style.webkitTransform = "rotate("+ (bear) +"deg)";
    bearNeedle.style.transform = "rotate("+ (bear) +"deg)";  
  },10);
}

  componentWillUnmount(){
    clearInterval(this.myInterval);
  }
 
  render() {
        return (
          <div>
    <div id="compass" className="compass">
      <div className="arrow" id="Needle"></div>
      <div className="bearing" id="bearneedle"></div>
      <div className="disc" id="compassDiscImg"></div>
    </div>
    </div>
        );
    }
}
 

export default Compas;