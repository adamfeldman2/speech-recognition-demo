var colorText = document.querySelector('.screen-color');
var startListeningButton = document.querySelector('.start-listening');
var recordingIcon = document.querySelector('.recording');
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

startListeningButton.addEventListener('click', function() {
  recognition.start();
  recordingIcon.style.display = 'inline-block';
});

recognition.onresult = function(event) {
  handleStringOfSpeech(event.results[0][0].transcript);
  recordingIcon.style.display = 'none';
};

function handleStringOfSpeech(str) {
  var arr = str.split(' ');

  for (var i = 0; arr.length > i; i++) {
    var wordLowerCase = arr[i].toLowerCase();
    if (colors.indexOf(wordLowerCase) >= 0) {
      var index = colors.indexOf(wordLowerCase);
      document.body.style.backgroundColor = colors[index];
    }
  }
  updateColorText(colors[index]);
}

function updateColorText(color) {
  colorText.textContent = color;
}
