import React, { Component } from 'react';
import signal from 'signal-js';

import mapData from '../DataModel/map.js';
import landsData from '../DataModel/land.js';
import BotataungData from '../DataModel/Botataung.js';
import System from '../DataModel/System.js';

let map;
let infoWindow;
let markerList = [];
let polygonList = [];
let selectedLand = 0;

class Map extends Component {

  initMap(zoom, center) {
    map = new window.google.maps.Map(document.querySelector('#map'), {
      zoom: zoom,
      center: center
    });
    console.log(map);
  };

  setMarker(position, map) {
    let marker = new window.google.maps.Marker({
      position: position,
      map: map
    });
    markerList.push(marker);
    console.log(marker);
  };

  clearMarker(markerList) {
    markerList.forEach(item => item.setMap(null));
    markerList = [];
  }

  setPolygon(land = 0) {
    BotataungData.forEach(item => {
      let _this = this
      let condition = Number(item.id) === Number(land);
      let color = condition ? '#FF0000' : item.color;
      let strokeWeight = condition ? 2 : 0;
      let polygon = new window.google.maps.Polygon({
        paths: item.coords,
        strokeColor: color,
        strokeOpacity: 0.8,
        strokeWeight: strokeWeight,
        fillColor: color,
        fillOpacity: 0.2
      });
      polygon.id = item.id;
      polygon.setMap(map);
      polygon.addListener('mouseover', this.showArrays);
      polygon.addListener('click', function() {
        System.land = this.id;

        selectedLand = this.id;
        _this.clearInfoWindow();
        _this.clearPolygon();
        _this.setPolygon(selectedLand);
        // signal.trigger('NotifyShowModal', {
        //   selectedLand: selectedLand,
        //   type: item.type,
        //   color: item.color
        // })
        // window.$('#exampleModal').modal('toggle');
        signal.trigger('NotifySelectLand', {
          id: selectedLand
        }, () => {
          System.land = selectedLand;
        })
        signal.trigger('NotifyShowDetailPanel', {
          id: selectedLand
        });
        signal.trigger('NotifySetMap', {
          zoom: 18,
          center: item.center
        });
      });
      polygonList.push(polygon);
    });
  };

  clearPolygon() {
    polygonList.forEach(item => item.setMap(null));
  };

  setInfoWindow() {
    infoWindow = new window.google.maps.InfoWindow();
  };

  clearInfoWindow() {
    if(infoWindow != null) {
      infoWindow.open(null);
    }
  };

  showArrays(event) {
    let contentString = `<b>Land ${this.id}</b><br>`

    infoWindow.setContent(contentString);
    infoWindow.setPosition(event.latLng);
    infoWindow.open(map);
  };

  setMap(zoom, center) {
    this.clearMarker(markerList, map);
    this.setMarker(center, map);
    map.panTo(center);
    map.addListener('idle', () => {
      map.setZoom(zoom);
    });
  };

  componentDidMount() {
    this.initMap(mapData.initZoom, mapData.initCenter);
    this.setMarker(mapData.initCenter, map);

    signal.on('NotifyShowLands', () => {
      this.clearMarker(markerList, map);
      this.setPolygon();
      this.setInfoWindow();
    });

    signal.on('NotifySetMap', params => {
      console.log('RecieveNotifySetMap');
      mapData.zoom = params.zoom;
      mapData.center = params.center;
      this.setMap(mapData.zoom, mapData.center)
    });

    signal.on('NotifyInitMap', () => {
      console.log('RecieveNotifyInitMap');
      this.clearInfoWindow();
      this.clearPolygon();
      this.setMap(mapData.initZoom, mapData.initCenter);
      this.setMarker(mapData.initCenter, map);
    });

    signal.on('NotifySelectLand', params => {
      this.clearInfoWindow();
      this.clearPolygon();
      this.setPolygon(params.id);
      this.setInfoWindow();
    })
  };

  componentWillReceiveProps(nextProps) {}

  render() {
    return (
      <div id="map" className="border border-dark" style={{width:'100%',height:'100%'}}></div>
    );
  }
};

export default Map;
