## convex hull algorithm
from [Computational Geometry: Algorithms and Applications ](https://www.amazon.com/Computational-Geometry-Applications-Mark-Berg/dp/3540779736) book

```javascript```
var convexHull = require('deberg-convex-hull');

var coords = [
    [0, 1],
    [2, 0],
    [3, 1],
    [2, 2],
    [2, 1]
]

console.log(convexHull(coords));
// prints [[0, 1],[2, 0],[3, 1],[2, 2]]

```
