
/* global L */

(function (window) {
	'use strict';
	
	var ititialLngLon;
	var initialZoom;
	
	function getInitialCoordinates () {
		if (localStorage && localStorage.getItem('ititialLngLon') && localStorage.getItem('initialZoom')){
			ititialLngLon =  JSON.parse(localStorage.getItem('ititialLngLon'));
			initialZoom =  localStorage.getItem('initialZoom');
		} else {
			ititialLngLon = [50.44262, 30.50508];
			initialZoom = 9;
		}
	}
	getInitialCoordinates();

	// map initializing
	var map = L.map('map').setView(ititialLngLon, initialZoom);

	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
	    maxZoom: 18
	}).addTo(map);


	// save current zoom and screen position to local storage 
	map.on('zoomend', function (e) {
		var zoom = e.target._animateToZoom;
    localStorage.setItem('initialZoom', zoom);
	});

	map.on('dragend', function () {
		var coord = map.getCenter();
		ititialLngLon = [coord.lat, coord.lng];
		localStorage.setItem('ititialLngLon',JSON.stringify(ititialLngLon));
	});

	window.app = window.app || {};
	window.app.map = map;
	
})(window); 
