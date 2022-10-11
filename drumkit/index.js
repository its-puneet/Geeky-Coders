var b_length = document.querySelectorAll(".drum").length;

for (var i = 0; i < b_length; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function () {
        var button_text = this.innerHTML;
        make_sound(button_text);
        add_animation(button_text);
    });
}


document.addEventListener("keypress", function (event) {
    make_sound(event.key);
    add_animation(event.key);
});


function make_sound(key) {
    switch (key) {
        case "w":
            var audio = new Audio("sounds/crash.mp3");
            audio.play();
            break;

        case "a":
            var audio = new Audio("sounds/kick-bass.mp3");
            audio.play();
            break;

        case "s":
            var audio = new Audio("sounds/snare.mp3");
            audio.play();
            break;

        case "d":
            var audio = new Audio("sounds/tom-1.mp3");
            audio.play();
            break;

        case "j":
            var audio = new Audio("sounds/tom-2.mp3");
            audio.play();
            break;

        case "k":
            var audio = new Audio("sounds/tom-3.mp3");
            audio.play();
            break;

        case "l":
            var audio = new Audio("sounds/tom-4.mp3");
            audio.play();
            break;

        default: alert("Incorrect alphabet!");
            break;
    }
}

function add_animation(pressed_key) {
    var active_button = document.querySelector("." + pressed_key);
    active_button.classList.add("pressed");
    setTimeout(function () {
        active_button.classList.remove("pressed");
    }, 100);
}

