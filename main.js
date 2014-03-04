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
    bpm = $('.bpm-controls input').val(),
    now = 0,
    then = 0,
    delta = 0;

function onResetClicked(event) {
    event.preventDefault();
    playing = false;
    beatsLeft = $('.reset-controls input').val();
}

function setBPM() {
    bpmValue = $('.bpm-controls input').val();
    if(bpm !== bpmValue) bpm = bpmValue;
    var $loRecord = $('.bpm-record-low .record'),
        $hiRecord = $('.bpm-record-high .record'),
        records = {
        lo: parseInt($loRecord.text()),
        hi: parseInt($hiRecord.text())
    };
    if(bpm < records.lo) $loRecord.text(bpm);
    if(bpm > records.hi) $hiRecord.text(bpm);
}


function onPlayPauseClicked(event) {
    event.preventDefault();
    togglePlay();
}

function togglePlay() {
    playing = !playing;
}

function onDeductClicked(event) {
    event.preventDefault();
    beatsLeft -=  $(event.target).prev().val();
}

function update() {
    now = Date.now();
    delta = now - then;
    var beatsPerMs = (bpm / 60 / 1000);
    beatsPassed = beatsPerMs * delta;
    if(playing) {
        if(Math.round(beatsLeft) > 0 ) {
            beatsLeft -= beatsPassed;
        } else {
            playing = false;
        }
    }
    then = now;
}

function render() {
    $('.beats-left').text(Math.round(beatsLeft));
    var $button = $('.playPause-button');
    if(playing && !$button.hasClass('playing')) {
        $button.removeClass("paused");
        $button.addClass("playing");
        $button.text("Pause");
    } else if(!playing && !$button.hasClass('paused')) {
        $button.removeClass("playing");
        $button.addClass("paused");
        $button.text("Play");
    }
}

$('.reset-button').on('click', onResetClicked);
$('.playPause-button').on('click', onPlayPauseClicked);
$('.incorrect-button').on('click', onDeductClicked);
$('.passed-button').on('click', onDeductClicked);
$('.clue-button').on('click', onDeductClicked);
$(document).on('keydown', function(event) {
    if(event.which === 32) {
        togglePlay();
    }
});

$('.bpm-controls input').on('keydown', function(event) {
    if(event.which === 13) {
        setBPM();
    }
});

(function animloop(){
  requestAnimFrame(animloop);
  update();
  render();
})();