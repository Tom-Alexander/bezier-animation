$(function(){

	var points = [[115, 239],[500,239],[500, 5],[940,5]];

	$elementToAnimate = $('.bezier');
	var counter = [0, 9.1];
	
	var curve  = Bezier.createCurve({
		points: points,
		start: 0,
		end: 100
	});


	$('.next').click(function(){
		Bezier.animateCurve($elementToAnimate, points, counter[0], counter[1], function(a){
			counter[0] += 9.1;
			counter[1] += 9.1;
		});
	});


	$('.prev').click(function(){
		Bezier.animateCurve($elementToAnimate, points, counter[1], counter[0], function(a){
			counter[0] -= 9.1;
			counter[1] -= 9.1;
		});
	});

	/*
	*
	* DRAW CURVE 
	*
	* for IE8:
	* https://code.google.com/p/explorercanvas/
	*/


	var c=document.getElementById("myCanvas");
	var ctx=c.getContext("2d");

	drawCurve();
	drawBars();


	function drawCurve(){

		ctx.beginPath();
		ctx.moveTo(curve[0][0],curve[0][1]);

		for(var j = 1; j < curve.length; j++){
			ctx.lineTo(curve[j][0],curve[j][1]);
		}

		ctx.strokeStyle = '#000000';	
		ctx.stroke();
	}

	function drawBars(){
		var index = 0;

		for(var i = 0; i < 11; i++){

			/*
			*
			* Draws the vertical bars along the curve 9.1px apart
			*
			*/

			ctx.moveTo(curve[Math.floor(index)][0],curve[Math.floor(index)][1]);
			ctx.lineTo(curve[Math.floor(index)][0],curve[Math.floor(index)][1] - 10);

			ctx.fillStyle = "#ff0000";

			/* 
			* Draws the red squares
			* The distance between each bar is not the same for all of them
			* 
			*/

			var width = curve[Math.floor(index + 9.1)][0] - curve[Math.floor(index)][0];
	  		ctx.fillRect (curve[Math.floor(index)][0],curve[Math.floor(index)][1], width, 50);

	  		console.log(width);

		 	ctx.strokeStyle = '#000000';	
			ctx.stroke();
			index += 9.1;
		}
	}

})