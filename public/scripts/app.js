const TOKEN = 'sk.eyJ1Ijoic3JpLWRldiIsImEiOiJjam9obnhnYW4wMDl3M3Zucjh1NDJxbGZoIn0.WcfmfgzddXP4D-_JAAcAKQ';
const ATTRIBUTION = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/map/1/places"
  }).done((places) => {
    // for (place of places) {
    //   console.log(place.place_lat, place.place_long);
    //   // $("<div>").text(user.name).appendTo($("body"));
    // }

    function createMarker(mapObj,  place) {
      const div = L.DomUtil.create('div', 'popup');
      new L.Marker([place.place_lat, -place.place_long]).bindPopup(div).addTo(mapObj);

      const img = L.DomUtil.create('img', 'place-img', div);
      img.src = `${place.image_url}`;

      const title = L.DomUtil.create('a', 'place-title', div);
      title.text = `${place.name}`;
      title.href = `${place.place_url}`;
      title.target = "_blank";

      const desc = L.DomUtil.create('p', 'place-desc', div);
      desc.textContent = `${place.description}`;
    }

    // set centre view
    const mapUI = L.map("mapid", {
      center: [43.6426, -79.3871],
      zoom: 15
    });

    // add a tile layer to add to our map
    L.tileLayer(
      "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: ATTRIBUTION,
        maxZoom: 20,
        id: "mapbox.streets",
        accessToken: TOKEN,
      }
    ).addTo(mapUI);

    // add other things to your map, including markers, polylines, polygons, circles, and popups
    // let marker = L.marker([43.6383, -79.4301]).addTo(mapUI).bindPopup('<p>Hello</p');
    for (place of places) {
      // console.log(place.place_lat, place.place_long);
      createMarker(mapUI, place);
      // const corr = -place.place_long;
      // marker = new L.marker([place.place_lat, corr])
      //   .bindPopup($(`<img src=${place.image_url} width="100" height="100">`))
      //   .addTo(mapUI);
    }
  });;
});
