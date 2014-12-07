/**
 * Created by davidm on 9/11/14.
 */
var styles = [
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {"color": "#ffffff"}
        ]
    }, {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {"color": "#50b8fa"}
        ]
    }, {
        "elementType": "labels.text.fill",
        "stylers": [
            {"color": "#111111"}
        ]
    }, {
        "featureType": "administrative.land_parcel",
        "stylers": [
            {"visibility": "off"}
        ]
    }, {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {"visibility": "simplified"},
            {"color": "#A1B70D"}
        ]
    }, {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
            {"visibility": "on"},
            {"color": "#dddddd"}
        ]
    }, {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
            {"visibility": "off"}
        ]
    }, {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [
            {"color": "#aaaaaa"},
            {"weight": 1.1}
        ]
    }, {
        "featureType": "poi.school",
        "elementType": "geometry.fill",
        "stylers": [
            {"color": "#eeeeee"}
        ]
    }, {
        "featureType": "poi.sports_complex",
        "elementType": "geometry.fill",
        "stylers": [
            {"color": "#A1B70D"}
        ]
    }, {
        "featureType": "water"}
];

var options = {
    mapTypeControlOptions: {
        mapTypeIds: ['UC']
    },
    center: new google.maps.LatLng(-43.523893, 172.583649),
    zoom: 15,
    scrollwheel: false,
    //disableDefaultUI: true,
    mapTypeId: 'UC'
};