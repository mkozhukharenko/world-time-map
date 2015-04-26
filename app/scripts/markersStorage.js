
(function (window) {
	'use strict';

	function MarkersStorage (markersView, map) {
		var _this = this;

		var addSingleMarkerToView = markersView.addSingleMarkerToView;

		var geojsonFeatures = {
			'type': 'FeatureCollection',
			'features': [
				{
					'type': 'Feature',
					'properties':  { 'popupContent': 'This is first makr!' + 
														' <br> <button type="button" class="remove btn btn-danger btn-xs">remove</button>' },
					'geometry': {
						'type': 'Point',
						'coordinates': [50.46546, 30.46783]
					}
				}
			]
		};

		function putToLocalStorage () {
			if (localStorage && localStorage.getItem('geojsonFeatures')){
				_this.geojsonFeatures = JSON.parse(localStorage.getItem('geojsonFeatures'));
			} else {
				_this.geojsonFeatures = geojsonFeatures;
				localStorage.setItem('geojsonFeatures',JSON.stringify(_this.geojsonFeatures));
			}
		}
		putToLocalStorage();

		this.createNewMarker = function  (event) {
			var popup = event.data.data;
			map.removeLayer(popup);

		  var newPoint = { 
		  	'type': 'Feature', 
		  	'properties': {
		  		'popupContent': ''
		  	},
		  	'geometry': {
		  		'type': 'Point',
		  		'coordinates': []
		  	}
			};

			var  newContent = popup.getContent().replace(/<but.+ton>/g, '');
			var removeBtn = '<button type="button" class="remove btn btn-danger btn-xs">remove</button>';
			newPoint.properties.popupContent = newContent + removeBtn;
			var LngLatObj = popup.getLatLng();
			newPoint.geometry.coordinates = [LngLatObj.lat, LngLatObj.lng];
		  _this.geojsonFeatures.features.push(newPoint);
			addSingleMarkerToView(newPoint);

			localStorage.setItem('geojsonFeatures',JSON.stringify(_this.geojsonFeatures));
		};
		
		this.deleteSingleMarker= function (id, arr) {
			var index = _.findIndex(arr, { 'id': id});
			arr.splice(1, index);
			localStorage.setItem('geojsonFeatures',JSON.stringify(_this.geojsonFeatures));
		};
	}

	window.app = window.app || {};
	window.app.MarkersStorage = MarkersStorage;
	
})(window); 
