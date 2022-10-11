var Interval = require("./interval");

var intervalManager = function() {
	var timers = {};
	
	this.addTimer = function(uid, fn, time) {
        timers[uid] = new Interval(fn, time);
        timers[uid].start();
        console.log("IntervalManager::addTimer "+this.length());
	};

    this.removeTimer = function(uid) {
        var timer = timers[uid];
        if (!timer) {
            return;
        }
        timer.stop();
        delete timers[uid];
        console.log("IntervalManager::removeTimer "+this.length());
    }

    this.isRunning = function(uid) {
        return timers[uid].isRunning();
    }

    this.length = function() {
        return Object.keys(timers).length;
    }
}

module.exports = new intervalManager();