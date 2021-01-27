import {CircularProgressbar,buildStyles} from 'react-circular-progressbar';
import React, { Component } from 'react';

const percentage = 66;

export default class Bms extends Component{

render(){
    return(
    <div>
         <div className="row">
          <div className="col-md-4">
          <CircularProgressbar value={percentage}  text={`${percentage}%`} 
           styles={buildStyles({
           
            strokeLinecap: 'butt',
            textSize: '16px',
            pathTransitionDuration: 0.5,
            
            pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
            textColor: '#f88',
            trailColor: '#d6d6d6',
            backgroundColor: '#3e98c7',
          })}/>
         </div> 
         <div className="col-md-4">
         <CircularProgressbar value={percentage} text={`${percentage}%`} /> 
        </div>
        <div className="col-md-4">
           <CircularProgressbar value={percentage} text={`${percentage}%`} />
        </div> 
        </div> 

    </div>
    );
  }
}