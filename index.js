/**
 * Created by pandachain on 2016-08-02.
 */

//this file uses codes from timer.js

// create two timer instances, pass initial argument as default 25 minutes and 5 minutes of the two timers
var sessionTimer = timer(25*60);
var breakTimer = timer(5*60);

// add events for plus and minus buttons for session
var addOneMinToSessionTimer = function(){
  sessionTimer.setRemainingSeconds(sessionTimer.getRemainingSeconds() + 60);
  document.querySelector('#session span').textContent = sessionTimer.getRemainingSeconds()/60;
  showInClock(sessionTimer.getRemainingSeconds());
};

var minusOneMinToSessionTimer = function(){
  if ( sessionTimer.getRemainingSeconds() > 60){
  sessionTimer.setRemainingSeconds(sessionTimer.getRemainingSeconds() - 60);
  document.querySelector('#session span').textContent = sessionTimer.getRemainingSeconds()/60;
  showInClock(sessionTimer.getRemainingSeconds());
  }
};

// add events for plus and minus buttons for break
var addOneMinToBreakTimer = function(){
  breakTimer.setRemainingSeconds(breakTimer.getRemainingSeconds() + 60);
  document.querySelector('#break span').textContent = breakTimer.getRemainingSeconds()/60;
};

var minusOneMinToBreakTimer = function(){
  if (breakTimer.getRemainingSeconds() > 60) {
    breakTimer.setRemainingSeconds(breakTimer.getRemainingSeconds() - 60);
    document.querySelector('#break span').textContent = breakTimer.getRemainingSeconds() / 60;
  }
};

var currentSession = document.querySelector('#currentSession');

var startOrPause = function(){
  if (currentSession.textContent === 'Session'){
    if (sessionTimer.isTimerRunning()){
      sessionTimer.stop();
    } else {
      sessionTimer.start(showInClock, toggleTimer);
    }
  } else if (currentSession.textContent === 'Break'){
    if(breakTimer.isTimerRunning()) {
      breakTimer.stop();
    } else {
      breakTimer.start(showInClock, toggleTimer)
    }
  }
};

var toggleTimer = function(seconds){
  if(seconds <= 0 && currentSession.textContent === 'Session'){
    playAlarm();
    currentSession.textContent = 'Break';
    breakTimer.start(showInClock, toggleTimer);
    sessionTimer.setRemainingSeconds(Number(document.querySelector('#session span').textContent) * 60)
  } else if (seconds <= 0 && currentSession.textContent === 'Break'){
    playAlarm();
    currentSession.textContent = 'Session';
    sessionTimer.start(showInClock, toggleTimer);
    breakTimer.setRemainingSeconds(Number(document.querySelector('#break span').textContent) *60)
    }
};

var resetTimer = function () {
  sessionTimer.reset();
  breakTimer.reset();
  showInClock(sessionTimer.getRemainingSeconds());
  document.querySelector('#session span').textContent = '25';
  document.querySelector('#break span').textContent = '5';
};

// show time in correct format in the clock area
var showInClock = function(seconds){
  var hour = Math.floor(seconds / 3600);
  var min = Math.floor((seconds - hour * 3600)/60);
  var sec = Math.floor(seconds - hour * 3600 - min * 60);
  document.querySelector('#timer p:nth-child(2)').textContent = twoDigits(hour) + ':' + twoDigits(min) + ':' + twoDigits(sec);
};

// ensure time is always displayed in two digits
var twoDigits = function(value){
  return ('0' + value).slice(-2)
};


//switch between play and stop icon
var switchPlayStop = function(){
  if (sessionTimer.isTimerRunning() || breakTimer.isTimerRunning()){
    document.querySelector('#play').setAttribute('style','display: none');
    document.querySelector('#stop').setAttribute('style','display: inline');
  } else {
    document.querySelector('#play').setAttribute('style','display: inline');
    document.querySelector('#stop').setAttribute('style','display: none');
  }
};

//audio event

var alarm = new Audio('http://soundbible.com/grab.php?id=1766&type=mp3');

var playAlarm = function(){
  alarm.play();
};

// assign button events
var sessionPlus = document.querySelector('#session .plus');
sessionPlus.onclick = addOneMinToSessionTimer;

var sessionMinus = document.querySelector('#session .minus');
sessionMinus.onclick = minusOneMinToSessionTimer;

var breakPlus = document.querySelector('#break .plus');
breakPlus.onclick = addOneMinToBreakTimer;

var breakMinus = document.querySelector('#break .minus');
breakMinus.onclick = minusOneMinToBreakTimer;

var controlButton = document.querySelector('#control');
controlButton.addEventListener('click', function(){
  startOrPause();
  switchPlayStop();
});

var resetButton = document.querySelector('#reset');
resetButton.onclick = resetTimer;