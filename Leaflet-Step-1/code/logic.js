// var myMap = L.map("map", {
//   center: [45.52, -122.67],
//   zoom: 13
// });

// // Adding a tile layer (the background map image) to our map:
// // We use the addTo() method to add objects to our map.
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(myMap);


// Store API endpoint as queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// create the base layers.
var basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});


// Create a map
var myMap = L.map("map", {
  center: [95.7129, 37.0902],
  zoom: 2
});
basemap.addTo(myMap);
// Define a markerSize() function that will give each earthquake a different radius based on its magnitude.
function markerSize(magnitude) {
  return Math.sqrt(magnitude) * 50;
}
// perform a get request to the url query
d3.json(queryUrl).then(function (data) {
  console.log(data.features);
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
  }
  function geojsonMarkerOptions(features){
    return {
    radius: markerSize(data.features.properties.mag),

    fillColor: getColor(data.features.geometry.coordinates[2]),
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
    }
    

  }
  function getColor(depth) {
    if (depth > -10 ) {
      return "#42f551";
    } else if (depth >= 10) {
      return "#d1f542";
    } else if (depth >= 30){
      return "#f5d742";
    } else if (depth >= 50){
      return "#f5b642";
    } else if (depth >= 70){
      return "#f57542";
    } else (depth >= 90)
      return "#f51b14";
    console.log(feature.geometry.coordinates[2]);
  };
    // return "#ea2c2c";
  // function getRadius(magnitude) {
  //   console.log(magnitude);
  //   var radius = markerSize();
  //   console.log(radius);
  // //   return radius;

  //   };
  L.geoJSON(data.features, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, geojsonMarkerOptions);
    }


  }).addTo(myMap);

});



// function createFeatures(earthquakeData){}

// L.geoJson(someGeojsonFeature, {
//   pointToLayer: function (feature, latlng) {
//       return L.circleMarker(latlng, geojsonMarkerOptions);
//   }
// }).addTo(map);







