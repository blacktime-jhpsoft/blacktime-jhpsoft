var countVal = 60; //1 minute
var counterVal = countVal;
var counter;

//FORMAT MINUTES IF LESS 10 ADD ZERO TO FRONT
function formatMin(ms) {
  var addZero = parseInt(ms / 60);
  if (addZero <= 9 ) {
    addZero = '0' + addZero;
  }
  return addZero;
}

//FORMAT SECONDS IF LESS 10 ADD ZERO TO FRONT
function formatSec(ms) {
  var addZero = ms % 60;
  if (addZero <= 9 ) {
    addZero = '0' + addZero;
  }
  return addZero;
}

//BACKGROUND FILLER FUNCTION
function filler(arg) {
  if (arg === 'clear') {
    $('.filler').css('top', '300px');
    return;
  }
  $('.filler').css('top', '-=' + 300/countVal);
}

//COUNTDOWN FUNCTION
function runner(){
  counterVal -= 1;
  filler();
  if(counterVal <= 0){
    clearInterval(counter);
    $('.countdown span').text('DONE!');
    return;
  }
  $('.countdown span').text(formatMin(counterVal) + ':' + formatSec(counterVal));
}

//TIME DECREMENT
$(document).on('click', '.decrement', function(event) {
  event.preventDefault();
  filler('clear');
  $('.increment').removeClass('unselect');  
  clearInterval(counter);
  if(countVal > 60){
    countVal -= 60;
    counterVal = countVal;
  } else {
    $(this).addClass('unselect');
  }
  $('.count-time').text(formatMin(countVal));
  $('.countdown span').text(formatMin(countVal) + ':00');
  $('.start').text('START');
});

//TIME INCREMENT
$(document).on('click', '.increment', function(event) {
  event.preventDefault();
  filler('clear');
  $('.decrement').removeClass('unselect');
  clearInterval(counter);
  if(countVal < 5940){
    countVal += 60;
    counterVal = countVal;
  } else {
    $(this).addClass('unselect');
  }
  $('.count-time').text(formatMin(countVal));
  $('.countdown span').text(formatMin(countVal) + ':00');
  $('.start').text('START');
});

//RESET COUNTER
$(document).on('click', '.reset', function(event) {
  event.preventDefault();
  filler('clear');
  clearInterval(counter);
  $('.countdown span').text(formatMin(countVal) + ':00');
  $('.start').text('START');
});

//START COUNTER
$(document).on('click', '.start', function(event) {
  event.preventDefault();  
  filler('clear');
  clearInterval(counter);
  counterVal = countVal;
  counter = setInterval(runner,1000);
  $(this).text('RESTART');
});

$(document).ready(function(){ 
  $('.count-time').text(formatMin(countVal));
  $('.countdown span').text(formatMin(countVal) + ':00');
});