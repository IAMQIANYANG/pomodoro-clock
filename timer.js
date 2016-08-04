/**
 * Created by pandachain on 2016-08-03.
 */

function timer(defaultSeconds) {

  let remainingSeconds = defaultSeconds;
  let interval;

  const self = {
    start: function(runningCallback, stopCallback){
      interval = setInterval(function(){
        if (remainingSeconds > 0){
          --remainingSeconds;
          runningCallback(remainingSeconds);
        } else {
          self.stop();
          stopCallback(remainingSeconds);
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
