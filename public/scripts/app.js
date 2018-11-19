const TOKEN =
  "sk.eyJ1Ijoic3JpLWRldiIsImEiOiJjam9obnhnYW4wMDl3M3Zucjh1NDJxbGZoIn0.WcfmfgzddXP4D-_JAAcAKQ";
const ATTRIBUTION =
  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/map/1/places"
  }).done(places => {
    // for (place of places) {
    //   console.log(place.place_lat, place.place_long);
    //   // $("<div>").text(user.name).appendTo($("body"));
    // }

    $.ajax({
      method: "GET",
      url: "/maps/all",
      success: function(rows) {
        createMapList(rows);
      }
    });

    let mapUI = createNewMap();

    // Create markers for the 1st place in the list as default
    for (place of places) {
      createMarker(mapUI, place);
    }

    $("#map-list ul").on("click", "li", function() {
      const mapId = $(this).data("mapId");
      // alert("you clicked a map with map id = " + $(this).data("mapId"));
      $.ajax(`/maps/${mapId}`, {
        method: "GET",
        success: function(places) {
          mapUI.remove();
          mapUI = createNewMap();
          for (const place of places) {
            createMarker(mapUI, place);
          }
        }
      });
    });

    function createNewMap() {
      let mapUI = L.map("mapid", {
        center: [43.6426, -79.3871],
        zoom: 15
      });

      // add a tile layer to add to our map
      L.tileLayer(
        "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
        {
          attribution: ATTRIBUTION,
          maxZoom: 20,
          id: "mapbox.streets",
          accessToken: TOKEN
        }
      ).addTo(mapUI);

      return mapUI;
    }

    function createMapList(mapList) {
      $("#map-list ul li").remove();
      for (const map of mapList) {
        const $listItem = $("<li>")
          .addClass("spaced-list")
          .append(`<a href="#">${map.name}</a>`)
          .data({
            mapId: map.id
          });
        $("#map-list ul").append($listItem);
        // $('#map-list ul').append(`<li class="spaced-list"><a href="#">${map.name}</a></li>`);
      }
    }

    function createMarker(mapObj, place) {
      const div = L.DomUtil.create("div", "popup");
      new L.Marker([place.place_lat, -place.place_long])
        .bindPopup(div)
        .addTo(mapObj);

      const img = L.DomUtil.create("img", "place-img", div);
      img.src = `${place.image_url}`;

      const title = L.DomUtil.create("a", "place-title", div);
      title.text = `${place.name}`;
      title.href = `${place.place_url}`;
      title.target = "_blank";

      const desc = L.DomUtil.create("p", "place-desc", div);
      desc.textContent = `${place.description}`;
    }
  });
});
