/**
 * Created by pandachain on 2016-08-03.
 */


function timer(newRemainingSeconds) {

  let remainingSeconds = newRemainingSeconds;
  let interval;

  const self = {
    start: function(callback){
      interval = setInterval(function(){
        if (remainingSeconds > 0){
          --remainingSeconds;
          callback(remainingSeconds);
        } else {
          self.stop();
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
    }
  };

  return self;
}
