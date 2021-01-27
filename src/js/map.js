var count=0;

var setInputFields =(lat,lng)=>{
	if(count>4){
		for(var i=0;i<4;i++){
			document.getElementById("latd"+i).value=(document.getElementById("latd"+(i+1)).value);
    		document.getElementById("lngd"+i).value=(document.getElementById("lngd"+(i+1)).value);
		}
		count=5;
		document.getElementById("latd"+4).value=parseFloat(lat);
		document.getElementById("lngd"+4).value=parseFloat(lng); 
	}
	else{
		document.getElementById("latd"+count).value=parseFloat(lat);
		document.getElementById("lngd"+count).value=parseFloat(lng);
		count=count+1;    
	}
}

module.exports.setInputFields = setInputFields;
