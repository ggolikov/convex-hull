var convexHull = require('../../src/convex-hull.js');

var osm = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
        maxZoom: 22,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),
    point = L.latLng([55.753210, 37.621766]),
    lmap = new L.Map('map', {layers: [osm], center: point, zoom: 12, maxZoom: 22}),
    generateButton = document.getElementsByClassName('generate')[0],
    pointsNumberButton = document.getElementsByClassName('points-number')[0],
    markers,
    polygon;

function drawHull() {
    if (markers) {
        lmap.removeLayer(markers);
    }

    if (polygon) {
        lmap.removeLayer(polygon);
    }

    var bounds = lmap.getBounds(),
        n = bounds._northEast.lat,
        e = bounds._northEast.lng,
        s = bounds._southWest.lat,
        w = bounds._southWest.lng,
        height = n - s,
        width = e - w,
        qHeight = height / 4,
        qWidth = width / 4,
        pointsNumber = pointsNumberButton.value,
        points,
        coords,
        res,
        lls;

    points = turf.random('points', pointsNumber, {
        bbox: [w + qWidth, s + qHeight, e - qWidth, n - qHeight]
    });

    coords = points.features.map(function (feature) {
        return feature.geometry.coordinates;
    });

    res = convexHull(coords);

    lls = res.map(function(coord) {
        return L.latLng([coord[1],coord[0]]);
    });

    markers = L.geoJson(points, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {radius: 3, fillColor: "#ffff00"});
        }
    }).addTo(lmap);

    polygon = L.polygon(lls, {color: "#ffb90f"}).addTo(lmap);
}

generateButton.onclick = drawHull;

drawHull();
