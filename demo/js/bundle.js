(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var convexHull = require('../../src/convex-hull.js');

var osm = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
    maxZoom: 22,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
}),
    point = L.latLng([55.753210, 37.621766]),
    lmap = new L.Map('map', { layers: [osm], center: point, zoom: 12, maxZoom: 22 }),
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

    lls = res.map(function (coord) {
        return L.latLng([coord[1], coord[0]]);
    });

    markers = L.geoJson(points, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, { radius: 3, fillColor: "#ffff00" });
        }
    }).addTo(lmap);

    polygon = L.polygon(lls, { color: "#ffb90f" }).addTo(lmap);
}

generateButton.onclick = drawHull;

drawHull();

},{"../../src/convex-hull.js":2}],2:[function(require,module,exports){
function convexHull(data) {
    var upperArr = [],
        lowerArr = [],
        clone;

    clone = data.slice();

    clone.sort(function (a, b) {
        return a[0] - b[0];
    });

    // calculate the upper hull
    for (var i = 0; i < clone.length; i++) {
        var point = clone[i];

        upperArr.push(point);
        removePoints(upperArr);
    }

    // calculate the lower hull
    for (var j = clone.length - 1; j >= 0; j--) {
        var point = clone[j];

        lowerArr.push(point);
        removePoints(lowerArr);
    }

    lowerArr.splice(0, 1);
    lowerArr.splice(lowerArr.length - 1, 1);

    // concat hulls
    return upperArr.concat(lowerArr);
}

function removePoints(arr) {
    while (arr.length >= 3 && !isTurnRight(arr[arr.length - 3], arr[arr.length - 2], arr[arr.length - 1])) {
        arr.splice(arr.length - 2, 1);
    }
}

function isTurnRight(point1, point2, point3) {
    var x1 = point1[0],
        x2 = point2[0],
        x3 = point3[0],
        y1 = point1[1],
        y2 = point2[1],
        y3 = point3[1];

    return (x2 - x1) * (y3 - y1) - (y2 - y1) * (x3 - x1) > 0;
}

module.exports = convexHull;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZW1vXFxqc1xcYXBwLmpzIiwic3JjXFxjb252ZXgtaHVsbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUksYUFBYSxRQUFRLDBCQUFSLENBQWpCOztBQUVBLElBQUksTUFBTSxFQUFFLFNBQUYsQ0FBWSxpRUFBWixFQUErRTtBQUNqRixhQUFTLEVBRHdFO0FBRWpGLGlCQUFhO0FBRm9FLENBQS9FLENBQVY7QUFBQSxJQUlJLFFBQVEsRUFBRSxNQUFGLENBQVMsQ0FBQyxTQUFELEVBQVksU0FBWixDQUFULENBSlo7QUFBQSxJQUtJLE9BQU8sSUFBSSxFQUFFLEdBQU4sQ0FBVSxLQUFWLEVBQWlCLEVBQUMsUUFBUSxDQUFDLEdBQUQsQ0FBVCxFQUFnQixRQUFRLEtBQXhCLEVBQStCLE1BQU0sRUFBckMsRUFBeUMsU0FBUyxFQUFsRCxFQUFqQixDQUxYO0FBQUEsSUFNSSxpQkFBaUIsU0FBUyxzQkFBVCxDQUFnQyxVQUFoQyxFQUE0QyxDQUE1QyxDQU5yQjtBQUFBLElBT0kscUJBQXFCLFNBQVMsc0JBQVQsQ0FBZ0MsZUFBaEMsRUFBaUQsQ0FBakQsQ0FQekI7QUFBQSxJQVFJLE9BUko7QUFBQSxJQVNJLE9BVEo7O0FBV0EsU0FBUyxRQUFULEdBQW9CO0FBQ2hCLFFBQUksT0FBSixFQUFhO0FBQ1QsYUFBSyxXQUFMLENBQWlCLE9BQWpCO0FBQ0g7O0FBRUQsUUFBSSxPQUFKLEVBQWE7QUFDVCxhQUFLLFdBQUwsQ0FBaUIsT0FBakI7QUFDSDs7QUFFRCxRQUFJLFNBQVMsS0FBSyxTQUFMLEVBQWI7QUFBQSxRQUNJLElBQUksT0FBTyxVQUFQLENBQWtCLEdBRDFCO0FBQUEsUUFFSSxJQUFJLE9BQU8sVUFBUCxDQUFrQixHQUYxQjtBQUFBLFFBR0ksSUFBSSxPQUFPLFVBQVAsQ0FBa0IsR0FIMUI7QUFBQSxRQUlJLElBQUksT0FBTyxVQUFQLENBQWtCLEdBSjFCO0FBQUEsUUFLSSxTQUFTLElBQUksQ0FMakI7QUFBQSxRQU1JLFFBQVEsSUFBSSxDQU5oQjtBQUFBLFFBT0ksVUFBVSxTQUFTLENBUHZCO0FBQUEsUUFRSSxTQUFTLFFBQVEsQ0FSckI7QUFBQSxRQVNJLGVBQWUsbUJBQW1CLEtBVHRDO0FBQUEsUUFVSSxNQVZKO0FBQUEsUUFXSSxNQVhKO0FBQUEsUUFZSSxHQVpKO0FBQUEsUUFhSSxHQWJKOztBQWVBLGFBQVMsS0FBSyxNQUFMLENBQVksUUFBWixFQUFzQixZQUF0QixFQUFvQztBQUN6QyxjQUFNLENBQUMsSUFBSSxNQUFMLEVBQWEsSUFBSSxPQUFqQixFQUEwQixJQUFJLE1BQTlCLEVBQXNDLElBQUksT0FBMUM7QUFEbUMsS0FBcEMsQ0FBVDs7QUFJQSxhQUFTLE9BQU8sUUFBUCxDQUFnQixHQUFoQixDQUFvQixVQUFVLE9BQVYsRUFBbUI7QUFDNUMsZUFBTyxRQUFRLFFBQVIsQ0FBaUIsV0FBeEI7QUFDSCxLQUZRLENBQVQ7O0FBSUEsVUFBTSxXQUFXLE1BQVgsQ0FBTjs7QUFFQSxVQUFNLElBQUksR0FBSixDQUFRLFVBQVMsS0FBVCxFQUFnQjtBQUMxQixlQUFPLEVBQUUsTUFBRixDQUFTLENBQUMsTUFBTSxDQUFOLENBQUQsRUFBVSxNQUFNLENBQU4sQ0FBVixDQUFULENBQVA7QUFDSCxLQUZLLENBQU47O0FBSUEsY0FBVSxFQUFFLE9BQUYsQ0FBVSxNQUFWLEVBQWtCO0FBQ3hCLHNCQUFjLFVBQVUsT0FBVixFQUFtQixNQUFuQixFQUEyQjtBQUNyQyxtQkFBTyxFQUFFLFlBQUYsQ0FBZSxNQUFmLEVBQXVCLEVBQUMsUUFBUSxDQUFULEVBQVksV0FBVyxTQUF2QixFQUF2QixDQUFQO0FBQ0g7QUFIdUIsS0FBbEIsRUFJUCxLQUpPLENBSUQsSUFKQyxDQUFWOztBQU1BLGNBQVUsRUFBRSxPQUFGLENBQVUsR0FBVixFQUFlLEVBQUMsT0FBTyxTQUFSLEVBQWYsRUFBbUMsS0FBbkMsQ0FBeUMsSUFBekMsQ0FBVjtBQUNIOztBQUVELGVBQWUsT0FBZixHQUF5QixRQUF6Qjs7QUFFQTs7O0FDOURBLFNBQVMsVUFBVCxDQUFvQixJQUFwQixFQUEwQjtBQUN0QixRQUFJLFdBQVcsRUFBZjtBQUFBLFFBQ0ksV0FBVyxFQURmO0FBQUEsUUFFSSxLQUZKOztBQUlBLFlBQVEsS0FBSyxLQUFMLEVBQVI7O0FBRUEsVUFBTSxJQUFOLENBQVcsVUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQjtBQUN2QixlQUFPLEVBQUUsQ0FBRixJQUFPLEVBQUUsQ0FBRixDQUFkO0FBQ0gsS0FGRDs7QUFJQTtBQUNBLFNBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxNQUFNLE1BQTFCLEVBQWtDLEdBQWxDLEVBQXVDO0FBQ25DLFlBQUksUUFBUSxNQUFNLENBQU4sQ0FBWjs7QUFFQSxpQkFBUyxJQUFULENBQWMsS0FBZDtBQUNBLHFCQUFhLFFBQWI7QUFDSDs7QUFFRDtBQUNBLFNBQUssSUFBSSxJQUFJLE1BQU0sTUFBTixHQUFlLENBQTVCLEVBQStCLEtBQUssQ0FBcEMsRUFBdUMsR0FBdkMsRUFBNEM7QUFDeEMsWUFBSSxRQUFRLE1BQU0sQ0FBTixDQUFaOztBQUVBLGlCQUFTLElBQVQsQ0FBYyxLQUFkO0FBQ0EscUJBQWEsUUFBYjtBQUNIOztBQUVELGFBQVMsTUFBVCxDQUFnQixDQUFoQixFQUFtQixDQUFuQjtBQUNBLGFBQVMsTUFBVCxDQUFnQixTQUFTLE1BQVQsR0FBa0IsQ0FBbEMsRUFBcUMsQ0FBckM7O0FBRUE7QUFDQSxXQUFPLFNBQVMsTUFBVCxDQUFnQixRQUFoQixDQUFQO0FBQ0g7O0FBRUQsU0FBUyxZQUFULENBQXNCLEdBQXRCLEVBQTJCO0FBQ3ZCLFdBQU8sSUFBSSxNQUFKLElBQWMsQ0FBZCxJQUFtQixDQUFDLFlBQVksSUFBSSxJQUFJLE1BQUosR0FBVyxDQUFmLENBQVosRUFBK0IsSUFBSSxJQUFJLE1BQUosR0FBVyxDQUFmLENBQS9CLEVBQWtELElBQUksSUFBSSxNQUFKLEdBQVcsQ0FBZixDQUFsRCxDQUEzQixFQUFpRztBQUM3RixZQUFJLE1BQUosQ0FBVyxJQUFJLE1BQUosR0FBVyxDQUF0QixFQUF5QixDQUF6QjtBQUNIO0FBQ0o7O0FBRUQsU0FBUyxXQUFULENBQXFCLE1BQXJCLEVBQTZCLE1BQTdCLEVBQXFDLE1BQXJDLEVBQTZDO0FBQ3pDLFFBQUksS0FBSyxPQUFPLENBQVAsQ0FBVDtBQUFBLFFBQ0ksS0FBSyxPQUFPLENBQVAsQ0FEVDtBQUFBLFFBRUksS0FBSyxPQUFPLENBQVAsQ0FGVDtBQUFBLFFBR0ksS0FBSyxPQUFPLENBQVAsQ0FIVDtBQUFBLFFBSUksS0FBSyxPQUFPLENBQVAsQ0FKVDtBQUFBLFFBS0ksS0FBSyxPQUFPLENBQVAsQ0FMVDs7QUFPQSxXQUFRLENBQUMsS0FBSyxFQUFOLEtBQWEsS0FBSyxFQUFsQixJQUF3QixDQUFDLEtBQUssRUFBTixLQUFhLEtBQUssRUFBbEIsQ0FBekIsR0FBa0QsQ0FBekQ7QUFDSDs7QUFFRCxPQUFPLE9BQVAsR0FBaUIsVUFBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIGNvbnZleEh1bGwgPSByZXF1aXJlKCcuLi8uLi9zcmMvY29udmV4LWh1bGwuanMnKTtcblxudmFyIG9zbSA9IEwudGlsZUxheWVyKCdodHRwOi8ve3N9LmJhc2VtYXBzLmNhcnRvY2RuLmNvbS9saWdodF9ub2xhYmVscy97en0ve3h9L3t5fS5wbmcnLCB7XG4gICAgICAgIG1heFpvb206IDIyLFxuICAgICAgICBhdHRyaWJ1dGlvbjogJ01hcCBkYXRhICZjb3B5OyA8YSBocmVmPVwiaHR0cDovL29wZW5zdHJlZXRtYXAub3JnXCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzLCA8YSBocmVmPVwiaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvYnktc2EvMi4wL1wiPkNDLUJZLVNBPC9hPidcbiAgICB9KSxcbiAgICBwb2ludCA9IEwubGF0TG5nKFs1NS43NTMyMTAsIDM3LjYyMTc2Nl0pLFxuICAgIGxtYXAgPSBuZXcgTC5NYXAoJ21hcCcsIHtsYXllcnM6IFtvc21dLCBjZW50ZXI6IHBvaW50LCB6b29tOiAxMiwgbWF4Wm9vbTogMjJ9KSxcbiAgICBnZW5lcmF0ZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2dlbmVyYXRlJylbMF0sXG4gICAgcG9pbnRzTnVtYmVyQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncG9pbnRzLW51bWJlcicpWzBdLFxuICAgIG1hcmtlcnMsXG4gICAgcG9seWdvbjtcblxuZnVuY3Rpb24gZHJhd0h1bGwoKSB7XG4gICAgaWYgKG1hcmtlcnMpIHtcbiAgICAgICAgbG1hcC5yZW1vdmVMYXllcihtYXJrZXJzKTtcbiAgICB9XG5cbiAgICBpZiAocG9seWdvbikge1xuICAgICAgICBsbWFwLnJlbW92ZUxheWVyKHBvbHlnb24pO1xuICAgIH1cblxuICAgIHZhciBib3VuZHMgPSBsbWFwLmdldEJvdW5kcygpLFxuICAgICAgICBuID0gYm91bmRzLl9ub3J0aEVhc3QubGF0LFxuICAgICAgICBlID0gYm91bmRzLl9ub3J0aEVhc3QubG5nLFxuICAgICAgICBzID0gYm91bmRzLl9zb3V0aFdlc3QubGF0LFxuICAgICAgICB3ID0gYm91bmRzLl9zb3V0aFdlc3QubG5nLFxuICAgICAgICBoZWlnaHQgPSBuIC0gcyxcbiAgICAgICAgd2lkdGggPSBlIC0gdyxcbiAgICAgICAgcUhlaWdodCA9IGhlaWdodCAvIDQsXG4gICAgICAgIHFXaWR0aCA9IHdpZHRoIC8gNCxcbiAgICAgICAgcG9pbnRzTnVtYmVyID0gcG9pbnRzTnVtYmVyQnV0dG9uLnZhbHVlLFxuICAgICAgICBwb2ludHMsXG4gICAgICAgIGNvb3JkcyxcbiAgICAgICAgcmVzLFxuICAgICAgICBsbHM7XG5cbiAgICBwb2ludHMgPSB0dXJmLnJhbmRvbSgncG9pbnRzJywgcG9pbnRzTnVtYmVyLCB7XG4gICAgICAgIGJib3g6IFt3ICsgcVdpZHRoLCBzICsgcUhlaWdodCwgZSAtIHFXaWR0aCwgbiAtIHFIZWlnaHRdXG4gICAgfSk7XG5cbiAgICBjb29yZHMgPSBwb2ludHMuZmVhdHVyZXMubWFwKGZ1bmN0aW9uIChmZWF0dXJlKSB7XG4gICAgICAgIHJldHVybiBmZWF0dXJlLmdlb21ldHJ5LmNvb3JkaW5hdGVzO1xuICAgIH0pO1xuXG4gICAgcmVzID0gY29udmV4SHVsbChjb29yZHMpO1xuXG4gICAgbGxzID0gcmVzLm1hcChmdW5jdGlvbihjb29yZCkge1xuICAgICAgICByZXR1cm4gTC5sYXRMbmcoW2Nvb3JkWzFdLGNvb3JkWzBdXSk7XG4gICAgfSk7XG5cbiAgICBtYXJrZXJzID0gTC5nZW9Kc29uKHBvaW50cywge1xuICAgICAgICBwb2ludFRvTGF5ZXI6IGZ1bmN0aW9uIChmZWF0dXJlLCBsYXRsbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBMLmNpcmNsZU1hcmtlcihsYXRsbmcsIHtyYWRpdXM6IDMsIGZpbGxDb2xvcjogXCIjZmZmZjAwXCJ9KTtcbiAgICAgICAgfVxuICAgIH0pLmFkZFRvKGxtYXApO1xuXG4gICAgcG9seWdvbiA9IEwucG9seWdvbihsbHMsIHtjb2xvcjogXCIjZmZiOTBmXCJ9KS5hZGRUbyhsbWFwKTtcbn1cblxuZ2VuZXJhdGVCdXR0b24ub25jbGljayA9IGRyYXdIdWxsO1xuXG5kcmF3SHVsbCgpO1xuIiwiZnVuY3Rpb24gY29udmV4SHVsbChkYXRhKSB7XG4gICAgdmFyIHVwcGVyQXJyID0gW10sXG4gICAgICAgIGxvd2VyQXJyID0gW10sXG4gICAgICAgIGNsb25lO1xuXG4gICAgY2xvbmUgPSBkYXRhLnNsaWNlKCk7XG5cbiAgICBjbG9uZS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHJldHVybiBhWzBdIC0gYlswXTtcbiAgICB9KTtcblxuICAgIC8vIGNhbGN1bGF0ZSB0aGUgdXBwZXIgaHVsbFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHBvaW50ID0gY2xvbmVbaV07XG5cbiAgICAgICAgdXBwZXJBcnIucHVzaChwb2ludCk7XG4gICAgICAgIHJlbW92ZVBvaW50cyh1cHBlckFycik7XG4gICAgfVxuXG4gICAgLy8gY2FsY3VsYXRlIHRoZSBsb3dlciBodWxsXG4gICAgZm9yICh2YXIgaiA9IGNsb25lLmxlbmd0aCAtIDE7IGogPj0gMDsgai0tKSB7XG4gICAgICAgIHZhciBwb2ludCA9IGNsb25lW2pdO1xuXG4gICAgICAgIGxvd2VyQXJyLnB1c2gocG9pbnQpO1xuICAgICAgICByZW1vdmVQb2ludHMobG93ZXJBcnIpO1xuICAgIH1cblxuICAgIGxvd2VyQXJyLnNwbGljZSgwLCAxKTtcbiAgICBsb3dlckFyci5zcGxpY2UobG93ZXJBcnIubGVuZ3RoIC0gMSwgMSk7XG5cbiAgICAvLyBjb25jYXQgaHVsbHNcbiAgICByZXR1cm4gdXBwZXJBcnIuY29uY2F0KGxvd2VyQXJyKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlUG9pbnRzKGFycikge1xuICAgIHdoaWxlIChhcnIubGVuZ3RoID49IDMgJiYgIWlzVHVyblJpZ2h0KGFyclthcnIubGVuZ3RoLTNdLCBhcnJbYXJyLmxlbmd0aC0yXSwgYXJyW2Fyci5sZW5ndGgtMV0pKSB7XG4gICAgICAgIGFyci5zcGxpY2UoYXJyLmxlbmd0aC0yLCAxKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGlzVHVyblJpZ2h0KHBvaW50MSwgcG9pbnQyLCBwb2ludDMpIHtcbiAgICB2YXIgeDEgPSBwb2ludDFbMF0sXG4gICAgICAgIHgyID0gcG9pbnQyWzBdLFxuICAgICAgICB4MyA9IHBvaW50M1swXSxcbiAgICAgICAgeTEgPSBwb2ludDFbMV0sXG4gICAgICAgIHkyID0gcG9pbnQyWzFdLFxuICAgICAgICB5MyA9IHBvaW50M1sxXTtcblxuICAgIHJldHVybiAoKHgyIC0geDEpICogKHkzIC0geTEpIC0gKHkyIC0geTEpICogKHgzIC0geDEpKSA+IDA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29udmV4SHVsbDtcbiJdfQ==
