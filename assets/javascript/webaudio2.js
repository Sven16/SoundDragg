//   // fork getUserMedia for multiple browser versions, for those
// // that need prefixes

// navigator.getUserMedia = (navigator.getUserMedia ||
//                           navigator.webkitGetUserMedia ||
//                           navigator.mozGetUserMedia ||
//                           navigator.msGetUserMedia);

// // set up forked web audio context, for multiple browsers
// // window. is needed otherwise Safari explodes

// var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
// var voiceSelect = document.getElementById("voice");
// var source;
// var stream;

// // grab the mute button to use below

// // var mute = document.querySelector('.mute');

// //set up the different audio nodes we will use for the app

// var analyser = audioCtx.createAnalyser();
// analyser.minDecibels = -90;
// analyser.maxDecibels = -10;
// analyser.smoothingTimeConstant = 0.85;

// var distortion = audioCtx.createWaveShaper();
// var gainNode = audioCtx.createGain();
// var biquadFilter = audioCtx.createBiquadFilter();
// var convolver = audioCtx.createConvolver();

// // distortion curve for the waveshaper, thanks to Kevin Ennis
// // http://stackoverflow.com/questions/22312841/waveshaper-node-in-webaudio-how-to-emulate-distortion

// function makeDistortionCurve(amount) {
//   var k = typeof amount === 'number' ? amount : 50,
//     n_samples = 44100,
//     curve = new Float32Array(n_samples),
//     deg = Math.PI / 180,
//     i = 0,
//     x;
//   for ( ; i < n_samples; ++i ) {
//     x = i * 2 / n_samples - 1;
//     curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
//   }
//   return curve;
// };

// // grab audio track via XHR for convolver node

// var soundSource, concertHallBuffer;

// var ajaxRequest = new XMLHttpRequest();

// ajaxRequest.open('GET', 'https://mdn.github.io/voice-change-o-matic/audio/concert-crowd.ogg', true);

// ajaxRequest.responseType = 'arraybuffer';


// ajaxRequest.onload = function() {
//   var audioData = ajaxRequest.response;

//   audioCtx.decodeAudioData(audioData, function(buffer) {
//       concertHallBuffer = buffer;
//       soundSource = audioCtx.createBufferSource();
//       soundSource.buffer = concertHallBuffer;
//     }, function(e){"Error with decoding audio data" + e.err});

//   soundSource.connect(audioCtx.destination);
//   soundSource.loop = true;
//   soundSource.start();

//   ajaxRequest.send();
// }



  // set up canvas context for visualizer

var canvas = document.querySelector('#visualizer');
var canvasCtx = canvas.getContext("2d");

// var intendedWidth = document.querySelector('.wrapper').clientWidth;

// canvas.setAttribute('width',intendedWidth);

// var visualSelect = document.getElementById("visual");

// var drawVisual;

// //main block for doing the audio recording

// if (navigator.mediaDevices.getUserMedia) {
//    console.log('getUserMedia supported.');
//    navigator.mediaDevices.getUserMedia (
//       // constraints - only audio needed for this app
//       {
//          audio: true,
//          video: { width: 1280, height: 720 }
//       },

//       // Success callback
//       function(stream) {

//       	// var video = document.querySelector('video');
//       	// source = audioCtx.createMediaStreamSource(stream);
//       	// video.srcObject = stream;
//        //  video.onloadedmetadata = function(e) {
//        //  	video.play();
//        //  };

//          source = audioCtx.createMediaStreamSource(stream);
//          source.connect(analyser);
//          analyser.connect(distortion);
//          distortion.connect(biquadFilter);
//          biquadFilter.connect(convolver);
//          convolver.connect(gainNode);
//          gainNode.connect(audioCtx.destination);

//       	 visualize();
//          voiceChange();

//       },

//       // Error callback
//       function(err) {
//          console.log('The following gUM error occured: ' + err);
//       }
//    );
// } else {
//    console.log('getUserMedia not supported on your browser!');
// }

function visualize() {
  WIDTH = canvas.width;
  HEIGHT = canvas.height;


  // var visualSetting = visualSelect.value;
  // console.log(visualSetting);


    analyser.fftSize = 2048;
    var bufferLength = analyser.fftSize;
    console.log(bufferLength);
    var dataArray = new Uint8Array(bufferLength);

    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

    function draw() {

      drawVisual = requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(dataArray);

      canvasCtx.fillStyle = 'rgb(200, 200, 200)';
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

      canvasCtx.beginPath();

      var sliceWidth = WIDTH * 1.0 / bufferLength;
      var x = 0;

      for(var i = 0; i < bufferLength; i++) {
   
        var v = dataArray[i] / 128.0;
        var y = v * HEIGHT/2;

        if(i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.lineTo(canvas.width, canvas.height/2);
      canvasCtx.stroke();
    };

    draw();
}








// // Prefer camera resolution nearest to 1280x720.
// var constraints = { audio: true, video: { width: 1280, height: 720 } }; 

// // stream = new MediaStream(stream);
// var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// navigator.mediaDevices.getUserMedia(constraints)
//     .then(function(stream) {
//       	var video = document.querySelector('video');
//       	source = audioCtx.createMediaStreamSource(stream);
//       	video.srcObject = stream;
//         video.onloadedmetadata = function(e) {
//         	video.play();
//         };
//     })
// .catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.