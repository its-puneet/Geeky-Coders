// Tool module to handle some server operations
var constants = require('./../public/constants.js');
constants = new constants();

//if index = -1, no games are available
exports.findGame = function(isPrivate, passwd, instances) {
    for (var uid in instances) {
        if (instances[uid].private == false) {
            if (instances[uid].nbCars < instances[uid].minCar) {
                if (instances[uid].launched == false) {
                    //console.log("public "+i);
                    return uid;
                }
            }
        } else {
            if (instances[uid].password == passwd) {
                if (instances[uid].nbCars < instances[uid].minCar) {
                    if (instances[uid].launched == false) {
                        //console.log("private "+i);
                        return uid;
                    }
                }
            }
        }
    }
    return -1;
}

// check if the number of players is enough to start the track
exports.checkLaunch = function(instance, socket) {
    console.log("checkLaunch --> " + instance.minCar + "   " + instance.nbCars);
    if (instance.minCar == instance.nbCars) {
        instance.launched = true;
        //emit a message to start the game
        socket.emit(constants.startGame);
        console.log(instance.room);
        socket.broadcast.to(instance.room).emit(constants.startGame);

        this.manageLaunch(instance, socket);
    }
    return instance;
}

//create counting
exports.manageLaunch = function(instance, socket) {
    var counting = 3;
    console.log("instance.room " + instance.room);

    function counting_function(instance, object) {
        socket.emit(constants.counting, counting);
        socket.broadcast.to(instance.room).emit(constants.counting, counting);

        if (counting == 0) {
            clearInterval(inter);
            //console.log("the game for the host is starting :'" + instance.host + "'");
            object.sendLogin(instance, socket);
        }
        counting--;
    }

    var inter = setInterval(counting_function, 1000, instance, this);
}

exports.destroyInstance = function(socket, instances, chatFunction) {
    //console.log("disconnection of the current instance " + instances[socket.uid].host + "by " + socket.uid);
    delete instances[socket.uid];
    chatFunction.deleteChatInstance(socket.uid);
    //console.log("number of instances in the server :" + Object.keys(instances).length);
}

exports.disconnect = function(socket, instances, chatFunction) {
    if (instances[socket.uid].nbCars == 1) {
        this.destroyInstance(socket, instances, chatFunction);
        return 0;

    }
    return -1;
}


exports.isInstanceExist = function(instances, newPasswd) {
    for (var uid in instances) {
        if (instances[uid].password == newPasswd) {
            return true;
        }
    }
    return false;
}

exports.hostIsLeaving = function(socket, instance) {
    socket.broadcast.to(instance.room).emit(constants.hostIsLeaving);
}

exports.disconnectEveryone = function(socket, instance) {
    socket.emit(constants.closeCo);
    socket.broadcast.to(instance.room).emit(constants.closeCo);
}

exports.sendLogin = function(instance, socket) {
    for (var i = 0; i < instance.nbCars; i++) {
        var message = {
            id: instance.cars[i].id,
            username: instance.cars[i].nickname
        };

        socket.emit(constants.logins, message);
        socket.broadcast.to(instance.room).emit(constants.logins, message);
    }
}

exports.findCar = function(instance, socketId) {
    for (var i = 0; i < instance.cars.length; i++) {
        if (instance.cars[i].sock == socketId) {
            return instance.cars[i];
        }
    }
    return -1;
}

exports.notifyGameIsFinish = function(instances, socket, chatFunction, intervalManager) {
    function delayGameIsFinishMessage() {
      if(instances[socket.uid] && instances[socket.uid] !== undefined) {
       socket.emit(constants.endGame);
       socket.broadcast.to(instances[socket.uid].room).emit(constants.endGame);
     }
    }
    for(var i = 0; i < instances[socket.uid].cars.length; i++) {
        intervalManager.removeTimer(instances[socket.uid].cars[i].sock);
    }
    setTimeout(delayGameIsFinishMessage, constants.DelayFinishMessageTimer);
}
