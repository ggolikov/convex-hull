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
    while (arr.length >= 3 && !isTurnRight(arr[arr.length-3], arr[arr.length-2], arr[arr.length-1])) {
        arr.splice(arr.length-2, 1);
    }
}

function isTurnRight(point1, point2, point3) {
    var x1 = point1[0],
        x2 = point2[0],
        x3 = point3[0],
        y1 = point1[1],
        y2 = point2[1],
        y3 = point3[1];

    return ((x2 - x1) * (y3 - y1) - (y2 - y1) * (x3 - x1)) > 0;
}

module.exports = convexHull;
