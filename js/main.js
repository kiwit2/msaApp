
var map = new google.maps.Map(document.getElementById("map"),{
  center:{
    lat: 27.72,
    lng: 85.36
  },
  zoom:15
});

var marker = new google.maps.Marker({
  position:{
    lat: 27.72,
    lng: 85.36
  },
  map:map,
  draggable: true
});

var searchBox = new google.maps.places.SearchBox(document.getElementById("mapsearch"));

google.maps.event.addListener(searchBox, "places_changed", function(){

  var places = searchBox.getPlaces();

  var bounds = new google.maps.LatLngBounds();
  var i, place;

  for(i=0; place=places[i]; i++){
    bounds.extend(place.geometry.location);
    marker.setPosition(place.geometry.location);
  }

  map.fitBounds(bounds);
  map.setZoom(15);
});

