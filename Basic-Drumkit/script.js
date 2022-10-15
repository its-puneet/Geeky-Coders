const elems = ["SNARE", "RIDE-CYMBAL", "TOM", "FLOOR-TOM", "HIHAT-CYMBAL", "CRASH-CYMBAL", "CLAP", "DSTICKS", "SPARKS"];
for (let i = 0; i < elems.length; i++) {
    {
        const element = document.getElementById(elems[i]);
        element.addEventListener("click", clicked);
    }
}

function clicked(event) {
    let element = event.target;
    let id = element.id;

    let path = 'assets/sounds/' + id + '.mp3';

    const sound = new Audio(path);
    sound.play();


}