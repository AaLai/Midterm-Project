// require("dotenv").config();
const TOKEN = 'sk.eyJ1Ijoic3JpLWRldiIsImEiOiJjam9obnhnYW4wMDl3M3Zucjh1NDJxbGZoIn0.WcfmfgzddXP4D-_JAAcAKQ';

// initialize the map and set its view to our chosen geographical coordinates and a zoom level
const eglinton = [43.699209, -79.435819];
const eastYork = [43.6912, -79.341667];
const bounds = L.latLngBounds(eglinton, eastYork);

const mymap = L.map("mapid", {
  center: [43.6383, -79.4301],
  zoom: 15
  // maxBounds: bounds,
});

// add a tile layer to add to our map
L.tileLayer(
  "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
    id: "mapbox.streets",
    accessToken: TOKEN,
  }
).addTo(mymap);

// add other things to your map, including markers, polylines, polygons, circles, and popups
const marker = L.marker([43.6383, -79.4301]).addTo(mymap);
marker
  .bindPopup(
    '<img src="https://www.lighthouselabs.ca/assets/press-175f5a7024cb2eb3744b4383e0ecb245ba63493f65bac8e7751448b12b66f465.jpg" width="260" height="150"><h3><a href="https://www.lighthouselabs.ca" target="_blank">Lighthouse Labs</a></h3><p>Bootcamp offering various Web & iOS programs</p>'
  )
  .openPopup();
// marker.bindTooltip("<h3>Lighthouse Labs</h3><p>Bootcamp offering various Web & iOS programs</p>").openTooltip();
// mymap.panTo([43.6383, -79.4301]);

// Dealing with events
function onMapClick(e) {
  alert("You clicked the map at " + e.latlng);
}

mymap.on("click", onMapClick);
