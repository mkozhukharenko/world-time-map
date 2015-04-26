
/* global moment, L*/

(function (window) {
	'use strict';

	function PopupView (map) {
		var _this = this;

		$.ajaxSetup({
		  url: 'http://api.timezonedb.com/',
		  type: 'GET',
		  data: { key: 'ISJHTKQ2ADR9',
		  				format: 'json' } 
		});

		var event;
		this.onMapClick = function (e) {
			event = e;
			$.ajax({
			  data: { 
			  				lat: e.latlng.lat,
			  				lng: e.latlng.lng,
			  			},
			 	success: showPopup
			});
		};

		this.popup = L.popup();
		function showPopup (res) {
	 		var localTime = moment.utc(res.timestamp, 'X').format('HH:mm:ss');
	 		var UTCtime = moment.utc().format('HH:mm:ss');
	    _this.popup
	      .setLatLng(event.latlng)
	      .setContent( event.latlng.toString() + 
	      						'<br> time-zone: ' + res.zoneName + 
	      						'<br> Current UTC time: ' + UTCtime +
	      						'<br> Current local time: ' + localTime + 
	      						'<br> <button type="button" class="add btn btn-success btn-xs">add to favorite</button>')
	      .openOn(map);
		}
	}


	window.app = window.app || {};
	window.app.PopupView = PopupView;

})(window); 
