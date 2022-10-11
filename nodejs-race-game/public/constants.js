// constants.js
var Constants = (function() {
    var Constants = function() {};

    Constants.prototype.acceleration = "acceleration";
    Constants.prototype.closeCo = "closeCo";
    Constants.prototype.closeConnection = "closeConnection";
    Constants.prototype.connection = "connection";
    Constants.prototype.counting = "counting";
    Constants.prototype.disconnect = "disconnect";
    Constants.prototype.disconnection = "disconnection";
    Constants.prototype.endGame = "endGame";
    Constants.prototype.instanceNotFound = "instanceNotFound";
    Constants.prototype.id = "id";
    Constants.prototype.infoPart = "infoPart";
    Constants.prototype.instanceDisconnection = "instanceDisconnection";
    Constants.prototype.isExist = "isExist";
    Constants.prototype.login = "login";
    Constants.prototype.logins = "logins";
    Constants.prototype.message = "message";
    Constants.prototype.myPosition = "myPosition";
    Constants.prototype.oldMessages = "oldMessages";
    Constants.prototype.ping = "ping";
    Constants.prototype.position = "position";
    Constants.prototype.startGame = "startGame";
    Constants.prototype.switchTrack = "switchTrack";
    Constants.prototype.trackPosition = "trackPosition";
    Constants.prototype.hostIsLeaving = "hostIsLeaving";

    Constants.prototype.notifyNewPlayerMessage = " is connected";


    Constants.prototype.DelayFinishMessageTimer = 150;

    return Constants;
})();

module.exports = Constants;
