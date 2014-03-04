window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();


var playing = false,
    beatsLeft = 1000;

function onResetClicked(event) {
    event.preventDefault();
    playing = false;
    beatsLeft = $('.reset-controls input').val();
    resetPlayButton();
}

function onSetBPMClicked(event) {
    event.preventDefault();
    console.log("Set BPM to " + $('.bpm-controls input').val());
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
    console.log("Deduct " + $('.incorrect-controls input').val() + " points");
}

function update() {
    if(playing) {
        beatsLeft--;
    }
}

function render() {
    $('.beats-left').text(beatsLeft);
}

$('.reset-button').on('click', onResetClicked);
$('.bpm-button').on('click', onSetBPMClicked);
$('.playPause-button').on('click', onPlayPauseClicked);
$('.incorrect-button').on('click', onDeductClicked);

(function animloop(){
  requestAnimFrame(animloop);
  update();
  render();
})();