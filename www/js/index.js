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
	
	},
	
	onError: function(error) {
		alert(error.message);
	}

};

//var swBound = new google.maps.LatLng(-43.524570, 172.581371);
//var neBound = new google.maps.LatLng(-43.523146, 172.583988);
//var bounds = new google.maps.LatLngBounds(swBound, neBound);

//var srcImage = "img/transparency";
