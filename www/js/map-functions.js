var map;
var poisCategory;
var poisSearch;
var markersCategory = [];
var markersSearch = [];
var infowindow;
var categoriesSelected = [];
var baseUrl = window.location.protocol + '//' + window.location.host;
var pathArray = window.location.pathname.split( '/' );
var servlet = pathArray[1];
var poiId;
var searchQuery;

function initialize() {
    map = new google.maps.Map(document.getElementById('map'), options);
    var styledMapType = new google.maps.StyledMapType(styles, {name: 'UC'});
    map.mapTypes.set('UC', styledMapType);
    //infowindow = new google.maps.InfoWindow();
    //$('#results').hide();
    //$('#noresults').hide();
      //// Try HTML5 geolocation
  //if(navigator.geolocation) {
    //navigator.geolocation.getCurrentPosition(function(position) {
        //var currentPos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
        //var currentPosMarker = new google.maps.Marker({
            //position: currentPos,
            //map: map,
            //icon: baseUrl+'/'+servlet+'/images/current_location.png',
            //title: 'Current Location'
        //});
    //}, function() {
    //});
  //} else {
  //}
}
function loadInitialData() {
    searchQuery = getUrlVars()["q"];
    poiId = getUrlVars()["poi"];
    if(searchQuery) {
        $('#appendedInputButton-02').val(searchQuery);
        getPOIsBySearch();
        return;
    }
    if(poiId) {
        getPOIById();
        return;
    }
}
// Read a page's GET URL variables and return them as an associative array.
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
function getPOIById() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', baseUrl+'/'+servlet+'/poi', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        loadPOIMapData(this.responseText);
    };
    xhr.send('data=' + poiId);
}
function loadPOIMapData(data) {
    clearCategoryMarkers();
    poisCategory = JSON.parse(data);
    for (i = 0; i < poisCategory.length; i++) {
        createPOIMarker(poisCategory[i]);
    }
    if(poisCategory.length === 1) {
        map.setCenter(new google.maps.LatLng(poisCategory[0].lat, poisCategory[0].lng));
    }
}
function createPOIMarker(poi) {
    var latlng = new google.maps.LatLng(poi.lat, poi.lng);
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        icon: poi.icon,
        title: poi.title
    });
    google.maps.event.addListener(marker, 'click', function() {
        poiId = poi.id;
        updatePOIURL();
        showInfoWindow(marker, poi);
    });
    markersCategory.push(marker);
    showInfoWindow(marker, poi);
}
function getPOIsByCategory() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', baseUrl+'/'+servlet+'/browse', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        loadCategoryMapData(this.responseText);
    };
    xhr.send('data=' + JSON.stringify(categoriesSelected));
}
function loadCategoryMapData(data) {
    clearCategoryMarkers();
    poisCategory = JSON.parse(data);
    for (i = 0; i < poisCategory.length; i++) {
        createCategoryMarker(poisCategory[i]);
    }
}
function remove(arr, item) {
  for(var i = arr.length; i--;) {
      if(arr[i] === item) {
          arr.splice(i, 1);
      }
  }
}
function createCategoryMarker(poi) {
    var latlng = new google.maps.LatLng(poi.lat, poi.lng);
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        icon: poi.icon,
        title: poi.title
    });
    google.maps.event.addListener(marker, 'click', function() {
        poiId = poi.id;
        updatePOIURL();
        showInfoWindow(marker, poi);
    });
    markersCategory.push(marker);
}
function clearCategoryMarkers() {
    for (i = 0; i < markersCategory.length; i++) {
        markersCategory[i].setMap(null);
    }
    markersCategory = [];
}
function loadSearchMapData(data) {
    clearSearchMarkers();
    $('#results ul li').remove();
    poisSearch = JSON.parse(data);
    if(poisSearch.length > 0) {
        $('#results').show();
        $('#noresults').hide();
    }else{
        $('#results').hide();
        $('#noresults').show(500);
    }
    for (i = 0; i < poisSearch.length; i++) {
        createSearchItem(poisSearch[i]);
        createSearchMarker(poisSearch[i]);
    }
}
function createSearchItem(poi) {
    $('#results ul').append(createSearchItemHtml(poi));
}
function createSearchItemHtml(poi) {
    var str = '<li id="' + poi.id + '">' +
            '<div class="map-result-header">' +
            '<img src="' + poi.icon + '" class="icon">' +
            '<strong>' + poi.title + '</strong>' +
            '</div>';
    if(poi.image) {
           str += '<img class="media-object img-responsive" src="' + poi.image + '" alt="' + poi.title + '">';
    }
          str +=  '<div class="description">' +
            poi.description +
            '</div>' +
            '</li>';
    return str;
}
function createSearchMarker(poi) {
    var latlng = new google.maps.LatLng(poi.lat, poi.lng);
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        icon: poi.icon,
        title: poi.title
    });

    google.maps.event.addListener(marker, 'click', function() {
        poiId = poi.id;
        updatePOIURL();
        showInfoWindow(marker, poi);
    });
    var myId = '#' + poi.id;
    $(myId).on('click', function() {
        poiId = poi.id;
        updatePOIURL();
        showInfoWindow(marker, poi);
    });
    markersSearch.push(marker);
}
function clearSearchMarkers() {
    for (i = 0; i < markersSearch.length; i++) {
        markersSearch[i].setMap(null);
    }
    markersSearch = [];
}
function showInfoWindow(marker, poi) {
    if (infowindow) {
        infowindow.close();
    }
    infowindow.setOptions({maxWidth: 250}, {maxHeight: 200});
    infowindow.setContent(createBubbleHtml(poi));
    infowindow.open(map, marker);
}
function createBubbleHtml(poi) {
    var str = '<div class="map-info-window-content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<div id="bodyContent">' +
            '<strong>' + poi.title + '</strong>';
    if(poi.image) {
            str += '<img src="' + poi.image + '">';
    }
        str +=    poi.description +
            '</div>' +
            '</div>';
    return str;
}
function updatePOIURL() {
    var params = {poi:poiId };
    var str = jQuery.param( params );
    window.history.pushState("UC Campus Maps", "UC Campus Maps", baseUrl+window.location.pathname+"?"+str);
}
function updateSearchURL() {
    var params = { q:searchQuery};
    var str = jQuery.param( params );
    window.history.pushState("UC Campus Maps", "UC Campus Maps", baseUrl+window.location.pathname+"?"+str);
}
function getPOIsBySearch() {
    if(searchQuery) {
        updateSearchURL();
        var xhr = new XMLHttpRequest();
        xhr.open('POST', baseUrl+'/'+servlet+'/search', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onload = function() {
            loadSearchMapData(this.responseText);
        };
        xhr.send('data=' + searchQuery);
    }else{
        //so we did a blank search - lets clear the results
        $('#results ul li').remove();
        $('#results').hide();
        clearSearchMarkers();
    }
}
google.maps.event.addDomListener(window, 'load', initialize);

$(document).ready(function() {
    $('.mapcheck').on('ifChecked', function(event) {
        categoriesSelected.push(event.target.value);
        getPOIsByCategory();
    });
    $('.mapcheck').on('ifUnchecked', function(event) {
        remove(categoriesSelected,event.target.value);
        getPOIsByCategory();
    });
});
     
$(document).ready(function() {
    $('#appendedInputButton-02').keypress(function(e) {
        if (e.which === 13) {
            searchQuery = $('#appendedInputButton-02').val();
            getPOIsBySearch();
        }
    });
    $('#btnSearch').click(function(e) {
        searchQuery = $('#appendedInputButton-02').val();
        getPOIsBySearch();
    });
});
