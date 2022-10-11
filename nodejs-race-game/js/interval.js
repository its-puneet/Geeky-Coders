var Interval = function(fn, time) {
    var timer = false;
    this.start = function () {
        if (!this.isRunning())
            timer = setInterval(fn, time);
    };
    this.stop = function () {
        clearInterval(timer);
        timer = false;
    };
    this.isRunning = function () {
        return timer !== false;
    };
}

module.exports = Interval;

// var i = new Interval(fncName, 1000);
// i.start();

// if (i.isRunning())
//     // ...

// i.stop();