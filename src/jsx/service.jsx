import React, { Component } from 'react';
var serv = require('../js/service');
var error = require('../js/errorField');

var idD=[" ","J247","DRIVE","ARM","STM","GPS","AUTO","ARMINV","CAMBOX","BIONODE","HDCAM","SDCAM","TBDETECT","BACK"];
var ER=["AUTO","BIONODE","TBDETECT"];
var BIO=["AUTO","TBDETECT"];
var AUTO=["ARMINV","ARM","CAMBOX","BIONODE"];
var idM=["CLEAR", "ALL", "ER", "AUTO", "BIO"];

export default class Service extends Component { 

    serviceCall = (event) =>{
        if(event.target.id=="BACK"){
            for(let i=0; i<idD.length-1; i++) {
                if(document.getElementById(idD[i+1]))
                    document.getElementById(idD[i+1]).parentNode.removeChild(document.getElementById(idD[i+1]));
            }
            for(let i=-1;i<idM.length-1; i++){
                var z= document.createElement('BUTTON');
                z.setAttribute('id',idM[i+1]);
                z.value=window.idMV[i+1];
                z.name=i+1;
                z.style.width="100%";
                z.style.margin="1px";
                z.className=window.idMC[i+1];
                z.onclick=this.mainTrig;
                z.innerHTML=idM[i+1];
                document.getElementById('servix').appendChild(z);
            }
        }
        else{
            serv.setupService(parseInt(event.target.name,10)+10);
        }
    }
    
    mainTrig = (event) =>{
        for(let i=0;i<idM.length;i++){
            if(window.idMC[i]=="btn btn-sm butn-success col-md-2")
                window.idMC[i]="btn btn-sm butn-info col-md-2";
            document.getElementById(idM[i]).className=window.idMC[i];
        }
        if(event.target.id!="CLEAR"){
            window.idMC[event.target.name]="btn btn-sm butn-success col-md-2";
            window.idMV[event.target.name]="start";
        
            for(let i=-1; i<idM.length-1; i++) {
                if(document.getElementById(idM[i+1]))
                    document.getElementById(idM[i+1]).parentNode.removeChild(document.getElementById(idM[i+1]));
            }
         
           
            for(let i=0;i<idD.length-1; i++){
                if(event.target.id=="ER"){
                    if(ER.includes(idD[i+1])){
                        continue;    
                    }
                }    
                else if(event.target.id=="BIO"){
                    if(BIO.includes(idD[i+1])){
                        continue;    
                    }
                }
                else if(event.target.id=="AUTO"){
                    if(AUTO.includes(idD[i+1])){
                        continue;    
                    }
                }
                    var z= document.createElement('BUTTON');
                    z.setAttribute('id',idD[i+1]);
                    z.value=window.idV[i+1];
                    z.name=i+1;
                    z.style.width="100%";
                    z.style.margin="1px";
                    z.className=window.idC[i+1];
                    z.onclick=this.serviceCall;
                    z.innerHTML=idD[i+1];
                    document.getElementById('servix').appendChild(z);
            }
        }
        
        serv.setupService(parseInt(event.target.name,10));    
    }
    
    renderdivD = () =>{
        var buttons = [];
    
        for(let i=-1; i<idM.length-1;i++){
            buttons.push(
                <button id={idM[i+1]} value={window.idMV[i+1]} name={i+1} onClick={this.mainTrig} style={{width:"100%", margin:'1px'}} className={window.idMC[i+1]}>
                    {idM[i+1]}
                </button>
            );
        }
        return buttons;
    }

    componentDidMount() {
        error.errorROS();
        serv.monitorNode();
    }

    render() {
        return (<div>
            <div id="servix" className="row" style={{margin:'15px'}}>
              {this.renderdivD()}
            </div> 
            <div className="row" style={{margin:'30px'}}>
              <span id="errorField" ></span>
            </div>
          </div>
          );
        }
}