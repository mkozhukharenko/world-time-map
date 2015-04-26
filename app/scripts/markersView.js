
/* global L */

(function (window) {
	'use strict';

	function MarkersView (map) {
		var _this = this;
		this.markers = [];
		
		this.addAllMarkersToView = function (arrayOfMarkers) {
			var arr = arrayOfMarkers;
			for(var w=0; w < arr.length; w++){
		    var marker = L.marker(arr[w].geometry.coordinates)   
		      .bindPopup(arr[w].properties.popupContent); 
		    map.addLayer(marker);
		    arr[w].id = marker._leaflet_id;
		    _this.markers[marker._leaflet_id] = marker;
		  }
		};

		this.addSingleMarkerToView = function (newMarker) {
	    var marker = L.marker(newMarker.geometry.coordinates)   
	      .bindPopup(newMarker.properties.popupContent); 
	    map.addLayer(marker);
	    _this.markers[marker._leaflet_id] = marker;
	    newMarker.id = marker._leaflet_id;
		};

		this.currentId = null;
		map.on('popupopen', function(e) {
	  	var marker = e.popup._source;
	  	if (marker) {
	  		_this.currentId = marker._leaflet_id;
	  		console.log(_this.currentId);
	  	}
		});
	}

	window.app = window.app || {};
	window.app.MarkersView = MarkersView;
	
})(window); 
