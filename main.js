
var map;
var markers = [];


function initMap() {
        
		var haightAshbury = {lat: 0, lng: 0};
        var coords = [{lat: 35.769222, lng: -50.446222},{lat: 35.769222, lng: -110.446222},{lat: 20.769222, lng: -100.446222},{lat: 32.769222, lng: -132.446222},{lat: 31.769, lng: -122.446},{lat: 39.769, lng: -122.446}]
		
		var styledMapType = new google.maps.StyledMapType(
          [
				{
					"stylers": [
						{
							"hue": "#ff1a00"
						},
						{
							"invert_lightness": true
						},
						{
							"saturation": -100
						},
						{
							"lightness": 33
						},
						{
							"gamma": 0.5
						}
					]
				},
				{
					"featureType": "water",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#2D333C"
						}
					]
				}
			],
			{name: 'Styled Map'});
		  
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 3,
          center: haightAshbury,
          mapTypeControlOptions: {
            mapTypeIds: [
                    'styled_map']
          }
        });
		
		map.mapTypes.set('styled_map', styledMapType);
        map.setMapTypeId('styled_map');
		
        for (var x = 0; x < coords.length; x++) {
		  addMarker(coords[x]);
		}
        // This event listener will call addMarker() when the map is clicked.
        map.addListener('click', function(event) {
          addMarker(event.latLng);
        });

        // Adds a marker at the center of the map.
        

      }
	  
   
         

  function addMarker(location) {
	var marker = new google.maps.Marker({
	  position: location,
	  map: map,
	  icon: "Twitter_bird_logo.png"
	  
	});
	markers.push(marker);
  }

  // Sets the map on all markers in the array.
  function setMapOnAll(map) {
	for (var i = 0; i < markers.length; i++) {
	  markers[i].setMap(map);
	}
  }

  // Removes the markers from the map, but keeps them in the array.
  function clearMarkers() {
	setMapOnAll(null);
  }

  // Shows any markers currently in the array.
  function showMarkers() {
	setMapOnAll(map);
  }

  // Deletes all markers in the array by removing references to them.
  function deleteMarkers() {
	clearMarkers();
	markers = [];
  }