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
var res = convexHull(coords);

var lls = res.map(function (coord) {
    return L.latLng(coord.reverse());
});

L.polyline(lls).addTo(map);
console.log(lls);

},{"../../src/convex-hull.js":2}],2:[function(require,module,exports){
function convexHull(data) {
    var sorted = data.sort(function (a, b) {
        return a[0] - b[0];
    }),
        resArr = [];

    for (var i = 0; i < sorted.length; i++) {
        var point = sorted[i];
        //
        if (i <= 2) {
            resArr.push(point);
        } else {
            while (resArr.length >= 3 && !isTurnRight(resArr[resArr.length - 3], resArr[resArr.length - 2], resArr[resArr.length - 1])) {
                resArr.splice(resArr.length - 2, 1);
            }

            resArr.push(point);
        }
    }
    console.log(resArr);

    return resArr;
}

function isTurnRight(point1, point2, point3) {
    var x1 = point1[0],
        x2 = point3[0],
        y1 = point1[1],
        y2 = point3[1];
    console.log(x1 * y2 - x2 * y1 > 0);
    return x1 * y2 - x2 * y1 > 0;
}

module.exports = convexHull;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZW1vXFxqc1xcYXBwLmpzIiwic3JjXFxjb252ZXgtaHVsbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUksYUFBYSxRQUFRLDBCQUFSLENBQWpCOztBQUVBLElBQUksTUFBTSxFQUFFLFNBQUYsQ0FBWSxpRUFBWixFQUErRTtBQUNqRixhQUFTLEVBRHdFO0FBRWpGLGlCQUFhO0FBRm9FLENBQS9FLENBQVY7QUFBQSxJQUlJLFFBQVEsRUFBRSxNQUFGLENBQVMsQ0FBQyxTQUFELEVBQVksU0FBWixDQUFULENBSlo7QUFBQSxJQUtJLE1BQU0sSUFBSSxFQUFFLEdBQU4sQ0FBVSxLQUFWLEVBQWlCLEVBQUMsUUFBUSxDQUFDLEdBQUQsQ0FBVCxFQUFnQixRQUFRLEtBQXhCLEVBQStCLE1BQU0sRUFBckMsRUFBeUMsU0FBUyxFQUFsRCxFQUFqQixDQUxWO0FBQUEsSUFNSSxPQUFPLFNBQVMsY0FBVCxDQUF3QixTQUF4QixDQU5YOztBQVFBLElBQUksU0FBUyxJQUFJLFNBQUosRUFBYjtBQUFBLElBQ0ksSUFBSSxPQUFPLFVBQVAsQ0FBa0IsR0FEMUI7QUFBQSxJQUVJLElBQUksT0FBTyxVQUFQLENBQWtCLEdBRjFCO0FBQUEsSUFHSSxJQUFJLE9BQU8sVUFBUCxDQUFrQixHQUgxQjtBQUFBLElBSUksSUFBSSxPQUFPLFVBQVAsQ0FBa0IsR0FKMUI7QUFBQSxJQUtJLFNBQVMsSUFBSSxDQUxqQjtBQUFBLElBTUksUUFBUSxJQUFJLENBTmhCO0FBQUEsSUFPSSxVQUFVLFNBQVMsQ0FQdkI7QUFBQSxJQVFJLFNBQVMsUUFBUSxDQVJyQjs7QUFVQSxJQUFJLFNBQVMsS0FBSyxNQUFMLENBQVksUUFBWixFQUFzQixHQUF0QixFQUEyQjtBQUNwQyxVQUFNLENBQUMsSUFBSSxNQUFMLEVBQWEsSUFBSSxPQUFqQixFQUEwQixJQUFJLE1BQTlCLEVBQXNDLElBQUksT0FBMUM7QUFEOEIsQ0FBM0IsQ0FBYjs7QUFJQSxJQUFJLFNBQVMsT0FBTyxRQUFQLENBQWdCLEdBQWhCLENBQW9CLFVBQVUsT0FBVixFQUFtQjtBQUNoRCxXQUFPLFFBQVEsUUFBUixDQUFpQixXQUF4QjtBQUNILENBRlksQ0FBYjs7QUFJQSxJQUFJLFVBQVUsRUFBRSxPQUFGLENBQVUsTUFBVixFQUFrQjtBQUM1QixrQkFBYyxVQUFVLE9BQVYsRUFBbUIsTUFBbkIsRUFBMkI7QUFDckMsZUFBTyxFQUFFLFlBQUYsQ0FBZSxNQUFmLEVBQXVCLEVBQUMsUUFBUSxDQUFULEVBQVksV0FBVyxTQUF2QixFQUF2QixDQUFQO0FBQ0g7QUFIMkIsQ0FBbEIsRUFJWCxLQUpXLENBSUwsR0FKSyxDQUFkOztBQU1BO0FBQ0EsSUFBSSxNQUFNLFdBQVcsTUFBWCxDQUFWOztBQUVBLElBQUksTUFBTSxJQUFJLEdBQUosQ0FBUSxVQUFTLEtBQVQsRUFBZ0I7QUFDOUIsV0FBTyxFQUFFLE1BQUYsQ0FBUyxNQUFNLE9BQU4sRUFBVCxDQUFQO0FBQ0gsQ0FGUyxDQUFWOztBQUlBLEVBQUUsUUFBRixDQUFXLEdBQVgsRUFBZ0IsS0FBaEIsQ0FBc0IsR0FBdEI7QUFDQSxRQUFRLEdBQVIsQ0FBWSxHQUFaOzs7QUMxQ0EsU0FBUyxVQUFULENBQW9CLElBQXBCLEVBQTBCO0FBQ3RCLFFBQUksU0FBUyxLQUFLLElBQUwsQ0FBVSxVQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCO0FBQ25DLGVBQU8sRUFBRSxDQUFGLElBQU8sRUFBRSxDQUFGLENBQWQ7QUFDSCxLQUZZLENBQWI7QUFBQSxRQUdBLFNBQVMsRUFIVDs7QUFLQSxTQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksT0FBTyxNQUEzQixFQUFtQyxHQUFuQyxFQUF3QztBQUNwQyxZQUFJLFFBQVEsT0FBTyxDQUFQLENBQVo7QUFDQTtBQUNBLFlBQUksS0FBSyxDQUFULEVBQVk7QUFDUixtQkFBTyxJQUFQLENBQVksS0FBWjtBQUNILFNBRkQsTUFFTztBQUNILG1CQUFPLE9BQU8sTUFBUCxJQUFpQixDQUFqQixJQUFzQixDQUFDLFlBQVksT0FBTyxPQUFPLE1BQVAsR0FBYyxDQUFyQixDQUFaLEVBQXFDLE9BQU8sT0FBTyxNQUFQLEdBQWMsQ0FBckIsQ0FBckMsRUFBOEQsT0FBTyxPQUFPLE1BQVAsR0FBYyxDQUFyQixDQUE5RCxDQUE5QixFQUFzSDtBQUNsSCx1QkFBTyxNQUFQLENBQWMsT0FBTyxNQUFQLEdBQWMsQ0FBNUIsRUFBK0IsQ0FBL0I7QUFDSDs7QUFFRCxtQkFBTyxJQUFQLENBQVksS0FBWjtBQUNIO0FBQ0o7QUFDRCxZQUFRLEdBQVIsQ0FBWSxNQUFaOztBQUVBLFdBQU8sTUFBUDtBQUNIOztBQUVELFNBQVMsV0FBVCxDQUFxQixNQUFyQixFQUE2QixNQUE3QixFQUFxQyxNQUFyQyxFQUE2QztBQUN6QyxRQUFJLEtBQUssT0FBTyxDQUFQLENBQVQ7QUFBQSxRQUNJLEtBQUssT0FBTyxDQUFQLENBRFQ7QUFBQSxRQUVJLEtBQUssT0FBTyxDQUFQLENBRlQ7QUFBQSxRQUdJLEtBQUssT0FBTyxDQUFQLENBSFQ7QUFJQSxZQUFRLEdBQVIsQ0FBWSxLQUFLLEVBQUwsR0FBVSxLQUFLLEVBQWYsR0FBb0IsQ0FBaEM7QUFDQSxXQUFPLEtBQUssRUFBTCxHQUFVLEtBQUssRUFBZixHQUFvQixDQUEzQjtBQUNIOztBQUVELE9BQU8sT0FBUCxHQUFpQixVQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgY29udmV4SHVsbCA9IHJlcXVpcmUoJy4uLy4uL3NyYy9jb252ZXgtaHVsbC5qcycpO1xyXG5cclxudmFyIG9zbSA9IEwudGlsZUxheWVyKCdodHRwOi8ve3N9LmJhc2VtYXBzLmNhcnRvY2RuLmNvbS9saWdodF9ub2xhYmVscy97en0ve3h9L3t5fS5wbmcnLCB7XHJcbiAgICAgICAgbWF4Wm9vbTogMjIsXHJcbiAgICAgICAgYXR0cmlidXRpb246ICdNYXAgZGF0YSAmY29weTsgPGEgaHJlZj1cImh0dHA6Ly9vcGVuc3RyZWV0bWFwLm9yZ1wiPk9wZW5TdHJlZXRNYXA8L2E+IGNvbnRyaWJ1dG9ycywgPGEgaHJlZj1cImh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL2xpY2Vuc2VzL2J5LXNhLzIuMC9cIj5DQy1CWS1TQTwvYT4nXHJcbiAgICB9KSxcclxuICAgIHBvaW50ID0gTC5sYXRMbmcoWzU1Ljc1MzIxMCwgMzcuNjIxNzY2XSksXHJcbiAgICBtYXAgPSBuZXcgTC5NYXAoJ21hcCcsIHtsYXllcnM6IFtvc21dLCBjZW50ZXI6IHBvaW50LCB6b29tOiAxMiwgbWF4Wm9vbTogMjJ9KSxcclxuICAgIHJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudCcpO1xyXG5cclxudmFyIGJvdW5kcyA9IG1hcC5nZXRCb3VuZHMoKSxcclxuICAgIG4gPSBib3VuZHMuX25vcnRoRWFzdC5sYXQsXHJcbiAgICBlID0gYm91bmRzLl9ub3J0aEVhc3QubG5nLFxyXG4gICAgcyA9IGJvdW5kcy5fc291dGhXZXN0LmxhdCxcclxuICAgIHcgPSBib3VuZHMuX3NvdXRoV2VzdC5sbmcsXHJcbiAgICBoZWlnaHQgPSBuIC0gcyxcclxuICAgIHdpZHRoID0gZSAtIHcsXHJcbiAgICBxSGVpZ2h0ID0gaGVpZ2h0IC8gNCxcclxuICAgIHFXaWR0aCA9IHdpZHRoIC8gNDtcclxuXHJcbnZhciBwb2ludHMgPSB0dXJmLnJhbmRvbSgncG9pbnRzJywgMTAwLCB7XHJcbiAgICBiYm94OiBbdyArIHFXaWR0aCwgcyArIHFIZWlnaHQsIGUgLSBxV2lkdGgsIG4gLSBxSGVpZ2h0XVxyXG59KTtcclxuXHJcbnZhciBjb29yZHMgPSBwb2ludHMuZmVhdHVyZXMubWFwKGZ1bmN0aW9uIChmZWF0dXJlKSB7XHJcbiAgICByZXR1cm4gZmVhdHVyZS5nZW9tZXRyeS5jb29yZGluYXRlcztcclxufSk7XHJcblxyXG52YXIgbWFya2VycyA9IEwuZ2VvSnNvbihwb2ludHMsIHtcclxuICAgIHBvaW50VG9MYXllcjogZnVuY3Rpb24gKGZlYXR1cmUsIGxhdGxuZykge1xyXG4gICAgICAgIHJldHVybiBMLmNpcmNsZU1hcmtlcihsYXRsbmcsIHtyYWRpdXM6IDUsIGZpbGxDb2xvcjogXCIjRkZGRjAwXCJ9KTtcclxuICAgIH1cclxufSkuYWRkVG8obWFwKTtcclxuXHJcbi8vIGNvbnNvbGUubG9nKGNvbnZleEh1bGwoY29vcmRzKSk7XHJcbnZhciByZXMgPSBjb252ZXhIdWxsKGNvb3Jkcyk7XHJcblxyXG52YXIgbGxzID0gcmVzLm1hcChmdW5jdGlvbihjb29yZCkge1xyXG4gICAgcmV0dXJuIEwubGF0TG5nKGNvb3JkLnJldmVyc2UoKSk7XHJcbn0pXHJcblxyXG5MLnBvbHlsaW5lKGxscykuYWRkVG8obWFwKTtcclxuY29uc29sZS5sb2cobGxzKTtcclxuIiwiZnVuY3Rpb24gY29udmV4SHVsbChkYXRhKSB7XHJcbiAgICB2YXIgc29ydGVkID0gZGF0YS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAgICAgcmV0dXJuIGFbMF0gLSBiWzBdO1xyXG4gICAgfSksXHJcbiAgICByZXNBcnIgPSBbXTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNvcnRlZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBwb2ludCA9IHNvcnRlZFtpXTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIGlmIChpIDw9IDIpIHtcclxuICAgICAgICAgICAgcmVzQXJyLnB1c2gocG9pbnQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHdoaWxlIChyZXNBcnIubGVuZ3RoID49IDMgJiYgIWlzVHVyblJpZ2h0KHJlc0FycltyZXNBcnIubGVuZ3RoLTNdLCByZXNBcnJbcmVzQXJyLmxlbmd0aC0yXSwgcmVzQXJyW3Jlc0Fyci5sZW5ndGgtMV0pKSB7XHJcbiAgICAgICAgICAgICAgICByZXNBcnIuc3BsaWNlKHJlc0Fyci5sZW5ndGgtMiwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJlc0Fyci5wdXNoKHBvaW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZyhyZXNBcnIpO1xyXG5cclxuICAgIHJldHVybiByZXNBcnI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzVHVyblJpZ2h0KHBvaW50MSwgcG9pbnQyLCBwb2ludDMpIHtcclxuICAgIHZhciB4MSA9IHBvaW50MVswXSxcclxuICAgICAgICB4MiA9IHBvaW50M1swXSxcclxuICAgICAgICB5MSA9IHBvaW50MVsxXSxcclxuICAgICAgICB5MiA9IHBvaW50M1sxXTtcclxuICAgIGNvbnNvbGUubG9nKHgxICogeTIgLSB4MiAqIHkxID4gMCk7XHJcbiAgICByZXR1cm4geDEgKiB5MiAtIHgyICogeTEgPiAwO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGNvbnZleEh1bGw7XHJcbiJdfQ==
