import React, { Component } from 'react';
import * as THREE from 'three';

var list= require('../js/receiveGyro');


var counter=0, anglex = 0, anglez = 0, aglx=0, aglz=0;

export default class Tdsimulator extends Component {

	componentDidMount(){
		list.setupServer();
		// var renderer = new THREE.WebGLRenderer();
		// renderer.setSize(325, 235);
		// renderer.setClearColor(0x7e858c, 1);
		// this.mount.appendChild(renderer.domElement);

		// var geometry = new THREE.BoxGeometry(1200, 150, 800, 5, 5, 5);
		// var material = new THREE.MeshBasicMaterial({
		// 	color: 0x000000,
		// 	wireframe: true
		// });
		
		// var cube = new THREE.Mesh(geometry, material);
		// var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
		// var scene = new THREE.Scene();
		
		// scene.add(cube)
		// camera.position.z = 1000;
		
		// function animate() {	 
		// 	if(!isNaN(window.x)&&!isNaN(window.z)) {			
		// 			requestAnimationFrame(renderer.render);
					
		// 			let diffx = window.x-aglx;
		// 			anglex -= 1.57 * diffx/60;
		// 			aglx=aglx+diffx/10;

		// 			let diffz = window.z - aglz;
		// 			anglez += 1.57 * diffz/60;
		// 			aglz=aglz+diffz/10;

		// 			cube.rotation.x = anglex;
		// 			cube.rotation.z = anglez;
		
		// 			renderer.render(scene, camera);
		// 			if(anglex<-0.5||anglex>0.6||anglez<-0.6||anglez>0.6)
		// 				renderer.setClearColor(0xfc0000, 1);
					
		// 			else
		// 				renderer.setClearColor(0xddf0ed, 1);
		// 	}	
		// }
		// this.animInterval = setInterval(animate,20);
	}	

	componentWillUnmount(){
		// clearInterval(this.animInterval);
	}		

	render(){
		return(
      		<div style={{margin:'1px'}} id='3dsimul' ref={ref => (this.mount = ref)} ></div>
	 	);
	}
}