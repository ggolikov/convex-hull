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
            while (resArr.length >= 3 && !isTurnRight(resArr[resArr.length-3], resArr[resArr.length-2], resArr[resArr.length-1])) {
                resArr.splice(resArr.length-2, 1);
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
