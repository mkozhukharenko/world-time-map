
/* global app  */

'use strict';
(function (window) {
	window.app = window.app || {};

	var map = app.map;
	var markersView = new app.MarkersView(map);
	var popupView = new app.PopupView(map);
	var markersStorage = new app.MarkersStorage(markersView, map);

	var allMarkersBank = markersStorage.geojsonFeatures.features;

	markersView.addAllMarkersToView(allMarkersBank);

	// show popup with Lng\Lat, UTC & local time, time
	map.on('contextmenu', popupView.onMapClick);
	
	// save mark as favorite
	$('#map').on('click', '.add', {data: popupView.popup}, markersStorage.createNewMarker);

	// remove mark
	$('#map').on('click', '.remove', function () {
		map.removeLayer(markersView.markers[markersView.currentId]);
		markersStorage.deleteSingleMarker(markersView.currentId, allMarkersBank);
	});



})(window);

