window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();


var playing = false,
    beatsLeft = 1000,
    bpm = 140,
    now = 0,
    then = 0,
    delta = 0;

function onResetClicked(event) {
    event.preventDefault();
    playing = false;
    beatsLeft = $('.reset-controls input').val();
    resetPlayButton();
}

function setBPM() {
    bpmValue = $('.bpm-controls input').val();
    if(bpm !== bpmValue) bpm = bpmValue;
}

function resetPlayButton() {
    var $button = $('.playPause-button');
    if(playing) {
        $button.removeClass("paused");
        $button.addClass("playing");
        $button.text("Pause");
    } else {
        $button.removeClass("playing");
        $button.addClass("paused");
        $button.text("Play");
    }
}

function onPlayPauseClicked(event) {
    event.preventDefault();
    playing = !playing;
    resetPlayButton();
}

function onDeductClicked(event) {
    event.preventDefault();
    beatsLeft -=  $('.incorrect-controls input').val();
}

function update() {
    now = Date.now();
    delta = now - then;
    setBPM();
    var beatsPerMs = (bpm / 60 / 1000);
    beatsPassed = beatsPerMs * delta;
    if(playing) {
        beatsLeft -= beatsPassed;
    }
    then = now;
}

function render() {
    $('.beats-left').text(Math.round(beatsLeft));
}

$('.reset-button').on('click', onResetClicked);
$('.playPause-button').on('click', onPlayPauseClicked);
$('.incorrect-button').on('click', onDeductClicked);

(function animloop(){
  requestAnimFrame(animloop);
  update();
  render();
})();