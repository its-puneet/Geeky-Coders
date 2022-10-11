function manageChat(socket) {
    socket.on(jaws.constants.message, function(message) {
        var messages = document.getElementById("listMessage");
        var messageJson = JSON.parse(message);
        messages.innerHTML += "<p class='text-muted'>" + messageJson.login + " : " + messageJson.message + "</p>";
    })
    socket.on(jaws.constants.oldMessages, function(message) {
        var oldMessages = document.getElementById("oldMessages");
        var messagesJson = JSON.parse(message);

        messagesJson.forEach(logArrayElements);
    })

    $('#submitChatMessage').click(function() {
        var message = $('#message').val();
        var listMessage = document.getElementById("listMessage");
        listMessage.innerHTML += "<p class='text-muted'>Moi : " + message + "</p>";
        socket.emit(jaws.constants.message, message);
        $('#message').val('');
        return false;
    })

    function logArrayElements(element, index, array) {
        var messages = document.getElementById("listMessage");
        messages.innerHTML += "<p class='text-muted'>" + element.login + " : " + element.message + "</p>";
    }
}
