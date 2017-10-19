var colorText = document.querySelector('.screen-color');
var button = document.querySelector('.button');
var listening = document.querySelector('.listening');
var isListening = true;
var colors = [
  'aqua',
  'beige',
  'black',
  'blue',
  'brown',
  'chocolate',
  'coral',
  'fuchsia',
  'gold',
  'gray',
  'grey',
  'green',
  'indigo',
  'ivory',
  'lavender',
  'magenta',
  'maroon',
  'navy',
  'olive',
  'orange',
  'pink',
  'purple',
  'red',
  'silver',
  'teal',
  'turquoise',
  'violet',
  'white',
  'yellow'
];

var recognition = new (window.SpeechRecognition ||
  window.webkitSpeechRecognition ||
  window.mozSpeechRecognition ||
  window.msSpeechRecognition)();

recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 3;

function handleSpeechStart() {
  recognition.start();
  recognition.onspeechstart = function(event) {
    console.log('Speech recognition has started...');
  };
  handleSpeechStop();
}

function handleSpeechStop() {
  recognition.onspeechend = function(event) {
    recognition.stop();
    handleSpeechResult();
    console.log('Speech recognition has stopped!');
  };
}

function handleSpeechResult() {
  recognition.onresult = function(event) {
    handleStringOfSpeech(event.results[0][0].transcript);
    setTimeout(function() {
      handleSpeechStart();
    }, 50);
  };
}

function handleStringOfSpeech(str) {
  var arr = str.split(' ');

  for (var i = 0; arr.length > i; i++) {
    var wordLowerCase = arr[i].toLowerCase();
    if (colors.indexOf(wordLowerCase) >= 0) {
      var index = colors.indexOf(wordLowerCase);
      document.body.style.backgroundColor = colors[index];
    }
  }
  colorText.textContent = colors[index];
}

button.addEventListener('click', function() {
  if (isListening) {
    recognition.abort();
    isListening = !isListening;
    listening.style.visibility = 'hidden';
    button.textContent = 'Okay, you can listen again';
  } else {
    handleSpeechStart();
    isListening = !isListening;
    listening.style.visibility = 'visible';
    button.textContent = 'Stop Listening To Me, Creep!';
  }
});

handleSpeechStart();
