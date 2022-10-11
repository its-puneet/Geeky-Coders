var constants = require('./../public/constants.js');
constants = new constants();

var ArrayMessages = new Array();

exports.addNewMessage = function(socket) {
    // trigger on 'send' button
    var fnc = performNewMessage.bind(socket);
    socket.on(constants.message, fnc);
}

exports.notifyNewPlayer = function(socket,login) {
    var fnc = performNewMessage.bind(socket);
    fnc(constants.notifyNewPlayerMessage);
}

exports.getOldMessages = function(socket) {
    for (var i = 0; i < ArrayMessages.length; i++) {
        if (socket.uid == ArrayMessages[i].id) {
            if (ArrayMessages[i].listMessage.length > 0) {
                socket.emit(constants.oldMessages, JSON.stringify(ArrayMessages[i].listMessage));
            }
            break;
        }
    }
}

exports.addChatInstance = function(id, room) {
    var newChat = {
        id: id,
        room: room,
        listMessage: []
    };
    ArrayMessages.push(newChat);
    console.log("new instance channel: {" + id + "}");

}

exports.deleteChatInstance = function(id) {
    for (var i = 0; i < ArrayMessages.length; i++) {
        if (id == ArrayMessages[i].id) {
            console.log("deletion of the channel: {" + id + "}");
            ArrayMessages.splice(i, 1);
            break;
        }
    }
}

function performNewMessage(message) {
    var socket = this;
    // get the nickname
    var newMessage = {
        'login': socket.login,
        'message': message
    };
    var messages = getArrayMessage(socket.uid);
    socket.broadcast.to(messages.room).emit(constants.message, JSON.stringify(newMessage));
    if (messages.listMessage.length > 15) {
        //delete the oldest messages
        messages.listMessage.splice(0, 1);
    }
}

function getArrayMessage(socketUid) {
    for (var i = 0; i < ArrayMessages.length; i++) {
         if (socketUid == ArrayMessages[i].id) {
            return ArrayMessages[i];
         }
    }
    return null;
}
