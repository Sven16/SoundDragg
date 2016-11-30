// requestAnimationFrame polyfill by Erik Möller.
if (!Date.now)
  Date.now = function() { return new Date().getTime(); };

(function() {
  'use strict';

  var vendors = ['webkit', 'moz'];

  for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
    var vp = vendors[i];
    window.requestAnimationFrame = window[vp+'RequestAnimationFrame'];
    window.cancelAnimationFrame = (window[vp+'CancelAnimationFrame'] || window[vp+'CancelRequestAnimationFrame']);
  }
  if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) // iOS6 is buggy
    || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
    var lastTime = 0;
    window.requestAnimationFrame = function(callback) {
      var now = Date.now();
      var nextTime = Math.max(lastTime + 16, now);
      return setTimeout(function() { callback(lastTime = nextTime); },
        nextTime - now);
    };
    window.cancelAnimationFrame = clearTimeout;
  }
}());

var context = document.getElementById('demo'),
			ctx = context.getContext('2d'),
			w = window.innerWidth,
			h = window.innerHeight,
			rad = Math.PI/180,
			phi = 2,
			size = 1000,
			r = 0;   
	
	context.width = w;
	context.height = h;

	var drawCanvas = function(r, num){
		for (var i = size; i >= 0; i--) {
			var x = w/4 + num*Math.cos((r+i)*phi*rad),
					y = h/4 + num*Math.sin((r+i)*phi*rad);

			ctx.save();
			ctx.beginPath();
			ctx.fillStyle = "rgba(" + (num%255) + ", 255," + (num%255) + ", " + 1/(size-i+1) + ")";;
			ctx.arc(x, y, 2, 0, 2*Math.PI);
			ctx.fill();
			ctx.restore();
		}
	}

	var animate = function(){
		requestAnimationFrame( animate );
		ctx.clearRect(0, 0, w, h);
		r++;
		drawCanvas(r, 100);
	}
	
	animate();

	window.addEventListener('resize', function() {
	  context.width = ctx.width = w = window.innerWidth;
	  context.height = ctx.height = h = window.innerHeight;
	}, false);