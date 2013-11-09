/**
* @license
*
* bezier-animation
* https://github.com/Tom-Alexander/bezier-animation/
* 
* copyright(c) 2013 Tom Alexander
* Licensed under the MIT license.
*
* RequestAnimationFrame polyfill
* https://gist.github.com/paulirish/1579671
*
**/

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());


;(function(){

	'use strict';

function bezierCurve(points) {
	return function (t) {
		for (var a = points; a.length > 1; a = b){
			for (var i = 0, b = [], j; i < a.length - 1; i++){ 
				for (b[i] = [], j = 0; j < a[i].length; j++) {
					b[i][j] = a[i][j] * (1 - t) + a[i+1][j] * t;
				}
			}
		}
		return a[0];
	}
}

	var Bezier = {

		createCurve: function(options){

			var data = [], i = 0;
			var b = bezierCurve(options.points);

			for (var t = options.start; t <= options.end; t++){
				data[i] = (b(t/100));
				i++;
			}

			return data;
		},

		animateCurve: function($ele, curve, start, end, callback){

				end = end > 100 ? 100 : end;
				start = start > 100 ? 100 : start;
				end = end < 0 ? 0 : end;
				start = start < 0 ? 0 : start;

				var points  = Bezier.createCurve({ 
					points: curve,
					start:  start > end ? end : start,
					end:    start > end ? start : end
				});

				var j = 0;
				var animation;
				var hasStopped = false;

				function animate() {
						var k = points.length-1;

						if(start > end){
							$ele.css('left', points[k-j][0]);
							$ele.css('top', points[k-j][1]);		
						} else {
							$ele.css('left', points[j][0]);
							$ele.css('top', points[j][1]);
						}

						if(j < k) {

							j++;
						}
						else {

							if(!hasStopped){
								hasStopped = true;
								cancelAnimationFrame(animation);
								callback(j);
							}

						}

				  animation = requestAnimationFrame(animate);
				}
				
				animation = requestAnimationFrame(animate);
		}

	}

if (typeof exports !== 'undefined') {
    module.exports = Bezier;
} else {
    window.Bezier = Bezier;
}

})();