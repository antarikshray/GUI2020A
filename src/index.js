import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import App from './jsx/App';

window.idV=[" ","stop","stop","stop","stop","stop","stop","stop","stop","stop","stop","stop","stop","stop"];
window.idC=[" ","btn btn-sm butn-info col-md-2","btn btn-sm butn-info col-md-2",
"btn btn-sm butn-info col-md-2","btn btn-sm butn-info col-md-2","btn btn-sm butn-info col-md-2",
"btn btn-sm butn-info col-md-2","btn btn-sm butn-info col-md-2","btn btn-sm butn-info col-md-2",
"btn btn-sm butn-info col-md-2","btn btn-sm butn-info col-md-2","btn btn-sm butn-info col-md-2",
"btn btn-sm butn-info col-md-2","btn btn-sm butn-default col-md-2"];
window.idMC=["btn btn-sm butn-danger col-md-2", "btn btn-sm butn-info col-md-2", "btn btn-sm butn-info col-md-2", "btn btn-sm butn-info col-md-2", "btn btn-sm butn-info col-md-2"];
window.idMV=["stop","stop","stop","stop","stop"];
window.check=[0,0,0,0,0];
window.idLeft=[0,0,0,0,0];
window.idRight=[0,0,0,0,0];
window.y=0;
window.difference=0;
window.point5=[];
window.log=[];
window.ctr = 0;
window.loc=['one.png','two.png','three.png','four.png','five.png'];
window.lines=[];
window.n=0;
window.distance="0";
window.color="#717275";
window.auto=false;
ReactDOM.render(<App />, document.getElementById('main'));  