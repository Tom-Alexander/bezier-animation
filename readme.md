
Usage
========

##Create curve
--------------

Creates a new path from a set of points. Any number of points can be used and they must be in the form ```[[x,y]]```. The start and end options are also required and both must be between 0 and 100. ```Bezier.createCurve``` will interpolate points between start and end. The first point on the path is the first element in the points array.
 
``` 
var curve  = Bezier.createCurve({
	points: [[120, 160], [35, 200], [220, 260], [220, 40]],
	start: 0,
	end: 100
});
``` 

##Animate curve
---------------

```Bezier.animateCurve``` requires jQuery. This function animates the position of an element between two points along a bezier curve. The start and end paramters must be between 0 and 1.

```
var points = [[120, 160], [35, 200], [220, 260], [220, 40]];

Bezier.animateCurve($('#myDiv'), points, 0, 50, function(e){
	console.log("Animation Complete!");
	console.log(e);
});
```

