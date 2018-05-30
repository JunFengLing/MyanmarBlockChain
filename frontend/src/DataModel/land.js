import landClassification from './landClassification.js'

const northeastBound = {
  lat: 16.8088342,
  lng: 96.1904686
};

const southwestBound = {
  lat: 16.779294,
  lng: 96.15649040000001
};

let latInteval = (northeastBound.lat - southwestBound.lat) / 10;
let lngInteval = (northeastBound.lng - southwestBound.lng) / 10;

let lands = [];
let id = 1;

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    let northeastCoord = {
      lat: northeastBound.lat - latInteval * i,
      lng: northeastBound.lng - lngInteval * j
    };
    let southeastCoord = {
      lat: northeastCoord.lat,
      lng: northeastCoord.lng - lngInteval
    };
    let southwestCoord = {
      lat: northeastCoord.lat - latInteval,
      lng: northeastCoord.lng - lngInteval
    };
    let northwestCoord = {
      lat: northeastCoord.lat - latInteval,
      lng: northeastCoord.lng
    };
    let temp = landClassification[Math.floor(Math.random() * landClassification.length)];
    let land = {
      id: id++,
      type: temp.type,
      color: temp.color,
      coords: [
        northeastCoord,
        southeastCoord,
        southwestCoord,
        northwestCoord
      ]
    };
    console.log(land);
    lands.push(land);
  }
}


export default lands;
