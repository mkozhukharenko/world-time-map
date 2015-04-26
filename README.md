##World-time-map

#### Descriptions

On right click on any location a ‘bubble’ with the following attributes show up:  
+ latitude / longitude;
+ timezone based on location;
+ current UTC time ;
+ current local time ;

The ‘bubble’ can be save to favorites (still visible on the map as a mark).
All marks saves to local storage and retrieves in the next session.
Current user zoom and screen position also saves to local storage. 


#### Used technologies
Application's been made using:
+ leaflet 0.7.3 (library for interactive maps) 
+ jQuery
+ momentJS
+ bootstrap


#### App directory Layout
```                  
css/                 
  main.css           	--> default stylesheet
js/            
  main.js            	--> main app scritp (unites other pieces)
  mapConfig.js       	--> main logic
  markersStorage.js  	--> model for markers
  markersView.js      --> view for markers
  popupView.js        --> view for popup (bubbles)     
index.html          --> the main html 
```
