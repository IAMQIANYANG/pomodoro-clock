/**
 * Created by pandachain on 2016-08-03.
 */

function timer(defaultSeconds) {

  let remainingSeconds = defaultSeconds;
  let interval;

  const self = {
    start: function(callback1, callback2){
      interval = setInterval(function(){
        if (remainingSeconds > 0){
          --remainingSeconds;
          callback1(remainingSeconds);
        } else {
          self.stop();
          callback2(remainingSeconds);
        }
      }, 1000)
    },
    stop: function() {
      clearInterval(interval);
      interval = undefined;
    },
    setRemainingSeconds: function(newSeconds) {
      remainingSeconds = newSeconds;
    },
    getRemainingSeconds: function() {
      return remainingSeconds;
    },
    isTimerRunning: function() {
      return interval;
    },
    reset: function() {
      remainingSeconds = defaultSeconds;
      self.stop();
      
    }
  };

  return self;
}
