/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    initialize: function() {
        this.bindEvents();
    },
    
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    
    onDeviceReady: function() {
		alert("Test");
		navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError);
    },
    
    onSuccess: function(position) {
		
	  var mapOptions = {
		  mapTypeControlOptions: {
	        mapTypeIds: ['UC']
	    },
	    center: new google.maps.LatLng(-43.523893, 172.583649),
	    zoom: 15,
	    scrollwheel: false,
	    mapTypeId: 'UC'
	  };
	  
	  var map = new google.maps.Map(document.getElementById('map-canvas'),
	      mapOptions);
	    var styledMapType = new google.maps.StyledMapType(styles, {name: 'UC'});
	    map.mapTypes.set('UC', styledMapType);
	    
		var overlay;
		UCOverlay.prototype = new google.maps.OverlayView();
		
		var swBound = new google.maps.LatLng(-43.524570, 172.581371);
		var neBound = new google.maps.LatLng(-43.523146, 172.583988);
		var bounds = new google.maps.LatLngBounds(swBound, neBound);
		  
		var srcImage = "img/transparency";
	
		overlay = new UCOverlay(bounds, srcImage, map);

		UCOverlay.prototype.onAdd = function() {
		
		  var div = document.createElement('div');
		  div.style.borderStyle = 'none';
		  div.style.borderWidth = '0px';
		  div.style.position = 'absolute';
		  
		  var img = document.createElement('img');
		  img.src = this.image_;
		  img.style.width = '100%';
		  img.style.height = '100%';
		  img.style.position = 'absolute';
		  div.appendChild(img);
		
		  this.div_ = div;
		
		  var panes = this.getPanes();
		  panes.overlayLayer.appendChild(div);
		};
		
		UCOverlay.prototype.draw = function() {
		
		  var overlayProjection = this.getProjection();
		
		  var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
		  var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

		  var div = this.div_;
		  div.style.left = sw.x + 'px';
		  div.style.top = ne.y + 'px';
		  div.style.width = (ne.x - sw.x) + 'px';
		  div.style.height = (sw.y - ne.y) + 'px';
		};
		
		USGSOverlay.prototype.onRemove = function() {
		  this.div_.parentNode.removeChild(this.div_);
		  this.div_ = null;
		};
	},
	
	onError: function(error) {
		alert(error.message);
	},
	
	UCOverlay: function(bounds, image, map) {

		  this.bounds_ = bounds;
		  this.image_ = image;
		  this.map_ = map;

		  this.div_ = null;

		  this.setMap(map);
	}
};
