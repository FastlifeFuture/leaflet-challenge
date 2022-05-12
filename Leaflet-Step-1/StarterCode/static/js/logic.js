// Store API endpoint as queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a Get request to the query URL/
d3.json(queryUrl).then(function(data){
  // Once we get a response, send the data, features object to the createFeatures function.
  createFeatures(data.features);
})
function markerSize(mag) {
  console.log(mag)
  if (mag === 0){return 1;} 
  return mag * 5;
  
}
function getColor(depth) {
  if ( depth < -10 ) {
    return "#42f551";
  } else if (depth <= 10) {
    return "#d1f542";
  } else if (depth <= 30){
    return "#f5d742";
  } else if (depth <= 50){
    return "#f5b642";
  } else if (depth <= 70){
    return "#f57542";
  } else (depth <= 90)
    return "#f51b14";
  console.log(feature.geometry.coordinates[2]);
}
function geojsonMarkerOptions(feature){
  return {
  radius: markerSize(feature.properties.mag),
  fillColor: getColor(feature.geometry.coordinates[2]),
  color: "#001",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8}

  
}
function createFeatures (earthquakeData){
  
  // Define a function that we want to run for each feature.
  // give each feature a pop up that describes the place abd time of the earthquake. 
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
  }

  // Creat a GeoJson layer that contains the features aray of the earthquake data object.
  // Run the onEachFeature function once for each piece of the data in the array.
  var earthquakes = L.geoJson(earthquakeData, {
    onEachFeature: onEachFeature, pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
    }, style: geojsonMarkerOptions
  });


  // send our earthquakes layer to the createMap Function
  createMap(earthquakes);

}

function createMap(earthquakes){
// create the base layers.
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create a baseMaps object.
  var baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };
  // Create an overlay object to hold our overlay.
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [street, earthquakes]
  });

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}

// Setting up legend the legend
var legend = L.control({position: 'bottomright'});
legend.onAdd = function(map){
    var div = L.DomUtil.create('div', 'info legend') 
}