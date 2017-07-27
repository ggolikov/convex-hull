(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var convexHull = require('../../src/convex-hull.js');

var osm = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
    maxZoom: 22,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
}),
    point = L.latLng([55.753210, 37.621766]),
    map = new L.Map('map', { layers: [osm], center: point, zoom: 12, maxZoom: 22 }),
    root = document.getElementById('content');

var bounds = map.getBounds(),
    n = bounds._northEast.lat,
    e = bounds._northEast.lng,
    s = bounds._southWest.lat,
    w = bounds._southWest.lng,
    height = n - s,
    width = e - w,
    qHeight = height / 4,
    qWidth = width / 4;

var points = turf.random('points', 100, {
    bbox: [w + qWidth, s + qHeight, e - qWidth, n - qHeight]
});

var coords = points.features.map(function (feature) {
    return feature.geometry.coordinates;
});

var markers = L.geoJson(points, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, { radius: 5, fillColor: "#FFFF00" });
    }
}).addTo(map);

// console.log(convexHull(coords));
convexHull(coords);

},{"../../src/convex-hull.js":2}],2:[function(require,module,exports){
function convexHull(data) {
    data.forEach(function (coord) {
        console.log(coord[0]);
    });
    var sorted = data.sort(function (a, b) {
        return a[0] - b[0];
    });

    // console.log(data);
    console.log('---');
    sorted.forEach(function (coord) {
        console.log(coord[0]);
    });
    // console.log(sorted);

    return sorted;
}

function isTurnRight(point1, point2, point3) {
    var x1 = point1[0],
        x2 = point3[0],
        y1 = point1[1],
        y2 = point3[1];

    return x1 * y2 - x2 * y1 > 0;
}

module.exports = convexHull;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZW1vXFxqc1xcYXBwLmpzIiwic3JjXFxjb252ZXgtaHVsbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUksYUFBYSxRQUFRLDBCQUFSLENBQWpCOztBQUVBLElBQUksTUFBTSxFQUFFLFNBQUYsQ0FBWSxpRUFBWixFQUErRTtBQUNqRixhQUFTLEVBRHdFO0FBRWpGLGlCQUFhO0FBRm9FLENBQS9FLENBQVY7QUFBQSxJQUlJLFFBQVEsRUFBRSxNQUFGLENBQVMsQ0FBQyxTQUFELEVBQVksU0FBWixDQUFULENBSlo7QUFBQSxJQUtJLE1BQU0sSUFBSSxFQUFFLEdBQU4sQ0FBVSxLQUFWLEVBQWlCLEVBQUMsUUFBUSxDQUFDLEdBQUQsQ0FBVCxFQUFnQixRQUFRLEtBQXhCLEVBQStCLE1BQU0sRUFBckMsRUFBeUMsU0FBUyxFQUFsRCxFQUFqQixDQUxWO0FBQUEsSUFNSSxPQUFPLFNBQVMsY0FBVCxDQUF3QixTQUF4QixDQU5YOztBQVFBLElBQUksU0FBUyxJQUFJLFNBQUosRUFBYjtBQUFBLElBQ0ksSUFBSSxPQUFPLFVBQVAsQ0FBa0IsR0FEMUI7QUFBQSxJQUVJLElBQUksT0FBTyxVQUFQLENBQWtCLEdBRjFCO0FBQUEsSUFHSSxJQUFJLE9BQU8sVUFBUCxDQUFrQixHQUgxQjtBQUFBLElBSUksSUFBSSxPQUFPLFVBQVAsQ0FBa0IsR0FKMUI7QUFBQSxJQUtJLFNBQVMsSUFBSSxDQUxqQjtBQUFBLElBTUksUUFBUSxJQUFJLENBTmhCO0FBQUEsSUFPSSxVQUFVLFNBQVMsQ0FQdkI7QUFBQSxJQVFJLFNBQVMsUUFBUSxDQVJyQjs7QUFVQSxJQUFJLFNBQVMsS0FBSyxNQUFMLENBQVksUUFBWixFQUFzQixHQUF0QixFQUEyQjtBQUNwQyxVQUFNLENBQUMsSUFBSSxNQUFMLEVBQWEsSUFBSSxPQUFqQixFQUEwQixJQUFJLE1BQTlCLEVBQXNDLElBQUksT0FBMUM7QUFEOEIsQ0FBM0IsQ0FBYjs7QUFJQSxJQUFJLFNBQVMsT0FBTyxRQUFQLENBQWdCLEdBQWhCLENBQW9CLFVBQVUsT0FBVixFQUFtQjtBQUNoRCxXQUFPLFFBQVEsUUFBUixDQUFpQixXQUF4QjtBQUNILENBRlksQ0FBYjs7QUFJQSxJQUFJLFVBQVUsRUFBRSxPQUFGLENBQVUsTUFBVixFQUFrQjtBQUM1QixrQkFBYyxVQUFVLE9BQVYsRUFBbUIsTUFBbkIsRUFBMkI7QUFDckMsZUFBTyxFQUFFLFlBQUYsQ0FBZSxNQUFmLEVBQXVCLEVBQUMsUUFBUSxDQUFULEVBQVksV0FBVyxTQUF2QixFQUF2QixDQUFQO0FBQ0g7QUFIMkIsQ0FBbEIsRUFJWCxLQUpXLENBSUwsR0FKSyxDQUFkOztBQU1BO0FBQ0EsV0FBVyxNQUFYOzs7QUNuQ0EsU0FBUyxVQUFULENBQW9CLElBQXBCLEVBQTBCO0FBQ3RCLFNBQUssT0FBTCxDQUFhLFVBQVUsS0FBVixFQUFpQjtBQUMxQixnQkFBUSxHQUFSLENBQVksTUFBTSxDQUFOLENBQVo7QUFDSCxLQUZEO0FBR0EsUUFBSSxTQUFTLEtBQUssSUFBTCxDQUFVLFVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0I7QUFDbkMsZUFBTyxFQUFFLENBQUYsSUFBTyxFQUFFLENBQUYsQ0FBZDtBQUNILEtBRlksQ0FBYjs7QUFJQTtBQUNKLFlBQVEsR0FBUixDQUFZLEtBQVo7QUFDSSxXQUFPLE9BQVAsQ0FBZSxVQUFVLEtBQVYsRUFBaUI7QUFDNUIsZ0JBQVEsR0FBUixDQUFZLE1BQU0sQ0FBTixDQUFaO0FBQ0gsS0FGRDtBQUdBOztBQUVBLFdBQU8sTUFBUDtBQUNIOztBQUVELFNBQVMsV0FBVCxDQUFxQixNQUFyQixFQUE2QixNQUE3QixFQUFxQyxNQUFyQyxFQUE2QztBQUN6QyxRQUFJLEtBQUssT0FBTyxDQUFQLENBQVQ7QUFBQSxRQUNJLEtBQUssT0FBTyxDQUFQLENBRFQ7QUFBQSxRQUVJLEtBQUssT0FBTyxDQUFQLENBRlQ7QUFBQSxRQUdJLEtBQUssT0FBTyxDQUFQLENBSFQ7O0FBS0EsV0FBTyxLQUFLLEVBQUwsR0FBVSxLQUFLLEVBQWYsR0FBb0IsQ0FBM0I7QUFDSDs7QUFFRCxPQUFPLE9BQVAsR0FBaUIsVUFBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIGNvbnZleEh1bGwgPSByZXF1aXJlKCcuLi8uLi9zcmMvY29udmV4LWh1bGwuanMnKTtcblxudmFyIG9zbSA9IEwudGlsZUxheWVyKCdodHRwOi8ve3N9LmJhc2VtYXBzLmNhcnRvY2RuLmNvbS9saWdodF9ub2xhYmVscy97en0ve3h9L3t5fS5wbmcnLCB7XG4gICAgICAgIG1heFpvb206IDIyLFxuICAgICAgICBhdHRyaWJ1dGlvbjogJ01hcCBkYXRhICZjb3B5OyA8YSBocmVmPVwiaHR0cDovL29wZW5zdHJlZXRtYXAub3JnXCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzLCA8YSBocmVmPVwiaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvYnktc2EvMi4wL1wiPkNDLUJZLVNBPC9hPidcbiAgICB9KSxcbiAgICBwb2ludCA9IEwubGF0TG5nKFs1NS43NTMyMTAsIDM3LjYyMTc2Nl0pLFxuICAgIG1hcCA9IG5ldyBMLk1hcCgnbWFwJywge2xheWVyczogW29zbV0sIGNlbnRlcjogcG9pbnQsIHpvb206IDEyLCBtYXhab29tOiAyMn0pLFxuICAgIHJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudCcpO1xuXG52YXIgYm91bmRzID0gbWFwLmdldEJvdW5kcygpLFxuICAgIG4gPSBib3VuZHMuX25vcnRoRWFzdC5sYXQsXG4gICAgZSA9IGJvdW5kcy5fbm9ydGhFYXN0LmxuZyxcbiAgICBzID0gYm91bmRzLl9zb3V0aFdlc3QubGF0LFxuICAgIHcgPSBib3VuZHMuX3NvdXRoV2VzdC5sbmcsXG4gICAgaGVpZ2h0ID0gbiAtIHMsXG4gICAgd2lkdGggPSBlIC0gdyxcbiAgICBxSGVpZ2h0ID0gaGVpZ2h0IC8gNCxcbiAgICBxV2lkdGggPSB3aWR0aCAvIDQ7XG5cbnZhciBwb2ludHMgPSB0dXJmLnJhbmRvbSgncG9pbnRzJywgMTAwLCB7XG4gICAgYmJveDogW3cgKyBxV2lkdGgsIHMgKyBxSGVpZ2h0LCBlIC0gcVdpZHRoLCBuIC0gcUhlaWdodF1cbn0pO1xuXG52YXIgY29vcmRzID0gcG9pbnRzLmZlYXR1cmVzLm1hcChmdW5jdGlvbiAoZmVhdHVyZSkge1xuICAgIHJldHVybiBmZWF0dXJlLmdlb21ldHJ5LmNvb3JkaW5hdGVzO1xufSk7XG5cbnZhciBtYXJrZXJzID0gTC5nZW9Kc29uKHBvaW50cywge1xuICAgIHBvaW50VG9MYXllcjogZnVuY3Rpb24gKGZlYXR1cmUsIGxhdGxuZykge1xuICAgICAgICByZXR1cm4gTC5jaXJjbGVNYXJrZXIobGF0bG5nLCB7cmFkaXVzOiA1LCBmaWxsQ29sb3I6IFwiI0ZGRkYwMFwifSk7XG4gICAgfVxufSkuYWRkVG8obWFwKTtcblxuLy8gY29uc29sZS5sb2coY29udmV4SHVsbChjb29yZHMpKTtcbmNvbnZleEh1bGwoY29vcmRzKTtcbiIsImZ1bmN0aW9uIGNvbnZleEh1bGwoZGF0YSkge1xuICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAoY29vcmQpIHtcbiAgICAgICAgY29uc29sZS5sb2coY29vcmRbMF0pO1xuICAgIH0pXG4gICAgdmFyIHNvcnRlZCA9IGRhdGEuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICByZXR1cm4gYVswXSAtIGJbMF07XG4gICAgfSlcblxuICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xuY29uc29sZS5sb2coJy0tLScpO1xuICAgIHNvcnRlZC5mb3JFYWNoKGZ1bmN0aW9uIChjb29yZCkge1xuICAgICAgICBjb25zb2xlLmxvZyhjb29yZFswXSk7XG4gICAgfSlcbiAgICAvLyBjb25zb2xlLmxvZyhzb3J0ZWQpO1xuXG4gICAgcmV0dXJuIHNvcnRlZDtcbn1cblxuZnVuY3Rpb24gaXNUdXJuUmlnaHQocG9pbnQxLCBwb2ludDIsIHBvaW50Mykge1xuICAgIHZhciB4MSA9IHBvaW50MVswXSxcbiAgICAgICAgeDIgPSBwb2ludDNbMF0sXG4gICAgICAgIHkxID0gcG9pbnQxWzFdLFxuICAgICAgICB5MiA9IHBvaW50M1sxXTtcblxuICAgIHJldHVybiB4MSAqIHkyIC0geDIgKiB5MSA+IDA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29udmV4SHVsbDtcbiJdfQ==
