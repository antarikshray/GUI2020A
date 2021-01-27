import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'
import localforage from 'localforage';
import 'leaflet-offline';
import 'leaflet-mouse-position'
var mapLayer = require('../js/map');
var path = require('path');
delete L.Icon.Default.prototype._getIconUrl;
var olld ;
var oldclrAuto;

    var tilesDb = {
        getItem: function (key) {
            return localforage.getItem(key);
        },
        saveTiles: function (tileUrls) {
            var self = this;
            var promises = [];
            for (var i = 0; i < tileUrls.length; i++) {
                var tileUrl = tileUrls[i];
                (function (i, tileUrl) {
                    promises[i] = new Promise(function (resolve, reject) {
                        var request = new XMLHttpRequest();
                        request.open('GET', tileUrl.url, true);
                        request.responseType = 'blob';
                        request.onreadystatechange = function () {
                            if (request.readyState === XMLHttpRequest.DONE) {
                                if (request.status === 200) {
                                    resolve(self._saveTile(tileUrl.key, request.response));
                                } else {
                                    reject({
                                        status: request.status,
                                        statusText: request.statusText
                                    });
                                }
                            }
                        };
                        request.send();
                    });
                })(i, tileUrl);
            }
            return Promise.all(promises);
        },
        clear: function () {
            return localforage.clear();
        },
        _saveTile: function (key, value) {
            return this._removeItem(key).then(function () {
                return localforage.setItem(key, value);
            });
        },
        _removeItem: function (key) {
            return localforage.removeItem(key);
        }
    }

    var offlineLayer = L.tileLayer.offline('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', tilesDb, {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        minZoom: 1,
        maxZoom: 19,
        subdomains: 'abc',
        crossOrigin: true
    });

    var offlineControl = L.control.offline(offlineLayer, tilesDb, {
        confirmSavingCallback: function (nTilesToSave, continueSaveTiles) {
            if (window.confirm('Save ' + nTilesToSave + '?')) {
                continueSaveTiles();
            }
        },
        confirmRemovalCallback: function (continueRemoveTiles) {
            if (window.confirm('Remove all the tiles?')) {
                continueRemoveTiles();
            }
        },
        minZoom: 1,
        maxZoom: 19
    });


L.Map.addInitHook(function () {
    // Store a reference of the Leaflet map object on the map container,
    // so that it could be retrieved from DOM selection.
    this.getContainer()._leaflet_map = this;
  });

export default class LeafletMap extends React.Component {
    constructor() {
        super()
        this.state = {
          lat: 12.82094,
          lng: 80.03847,
        }
    }
 
    componentDidMount() {     
        var map = L.map('map-id');
        offlineControl.addTo(map); 
        offlineLayer.addTo(map);
        var b = L.control.mousePosition().addTo(map);
        // L.control.mouseCoordinate({gpsLong:true}).addTo(map);
            
        map.setView({
            lat: this.state.lat,
            lng: this.state.lng       //12.821141 80.038492
        }, 50);
        
        map.on('click' , function (e) {
            if(window.auto){
                 if (window.point5.length > 4) {
                    map.removeLayer(window.point5[0]);
                    window.point5 = window.point5.slice(1);
                    map.removeLayer(window.lines[0]);
                    window.lines = window.lines.slice(1);    
                }
                if(window.point5.length===0) {
                    olld=[e.latlng.lat,e.latlng.lng];
                }
                else if(window.point5.length>0){
                    var pointA = new L.LatLng(olld[0], olld[1]);
                    var pointB = new L.LatLng(e.latlng.lat,e.latlng.lng);
                    var pointList = [pointA, pointB];

                    var polylines = new L.Polyline(pointList, {
                        color: 'red',
                        weight: 3,
                        opacity: 0.5,
                        smoothFactor: 1
                    });
                    window.lines.push(polylines);
                    polylines.addTo(map);
                    olld=[e.latlng.lat,e.latlng.lng];
                }    

                    mapLayer.setInputFields(e.latlng.lat.toFixed(6),e.latlng.lng.toFixed(6));
                        L.Icon.Default.mergeOptions({
                            iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
                            iconUrl: require("../images/"+window.loc[window.ctr%5]),
                            shadowUrl: require('leaflet/dist/images/marker-shadow.png')
                        });
                    window.ctr++;
                    window.point5.push(L.marker(e.latlng).addTo(map));  
            }          
        }) 
    }

  //render the map
  render() {
    return (
      <div id="map-id" style={{height:'70%', width:'100%'}}>     
      </div>
    );
  }
}
