function convexHull(data) {
    data.forEach(function (coord) {
        console.log(coord[0]);
    })
    var sorted = data.sort(function (a, b) {
        return a[0] - b[0];
    })

    // console.log(data);
console.log('---');
    sorted.forEach(function (coord) {
        console.log(coord[0]);
    })
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
