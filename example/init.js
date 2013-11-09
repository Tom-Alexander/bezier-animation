$(function(){

	var points = [[120, 160], [35, 200], [220, 260], [220, 40]];

	// this curve is just to generate the canvas drawing
	var curve  = Bezier.createCurve({
		points: points,
		start: 0,
		end: 100
	});

	var c=document.getElementById("myCanvas");
	var ctx=c.getContext("2d");
	for(var j = 0; j < curve.length; j++){
		ctx.beginPath();
		ctx.arc(curve[j][0], curve[j][1], 4, 0, 2 * Math.PI, false);
		ctx.fillStyle = 'black';
		ctx.fill();
	}

	var $ele = $('.bezier');
	var $currentElement = $('.popup-container .popup').first();

	$('.next').click(function(){
		$currentElement = $currentElement.next().length > 0 ? $currentElement.next() : $('.popup-container .popup').first();
			Bezier.animateCurve($ele, points, $currentElement.data('start'), $currentElement.data('end'), function(a){
			$('.popup').hide();
			$currentElement.show();
		});
	});

	$('.prev').click(function(){
		$currentElement = $currentElement.prev().length > 0 ? $currentElement.prev() : $('.popup-container .popup').last();
		Bezier.animateCurve($ele, points, $currentElement.data('end'), $currentElement.data('start'), function(a){
		$('.popup').hide();
		$currentElement.show();
		});
	});

	$('.elementSwitch').click(function(){				
		Bezier.animateCurve($ele, points, $currentElement.data('start'), $('#popup1').data('start'), function(a){
			$('.popup').hide();
			$currentElement = $('#popup1');
			$currentElement.show();
		});
	})
})