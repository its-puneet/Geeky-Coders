// JavaScript source code
const isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ||
    (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.platform)));
if (isMobile) {
    const txtB1 = document.getElementById("23");
    txtB1.style.height = "40%";
    const txtB2 = document.getElementById("24");
    txtB2.style.height = "40%";
    const encb = document.getElementById("CIPHER");
    encb.style.height = "4%";
    encb.style.width = "13%";
    encb.style.fontSize = "28px";
    const swi = document.getElementById("enc");
    swi.style.minHeight = "10%";
    swi.style.fontSize = "28px";
    const lab1 = document.getElementsByClassName("labs");
    for (const labe of lab1) {
        labe.style.fontSize = "28px";
    }
}
class Encrypter {
    static performPadding(s) {
        while (s.length < 4) {
            s += " ";
        }
        return s;
    }
    static doEncryption(s) {
        s = Encrypter.performPadding(s);
        let re = Encrypter.shuffle(s);
        return Encrypter.encrypt(re);
    }
    static doDecryption(s) {
        let re = Encrypter.decrypt(s);
        re = Encrypter.unshuffle(re);
        return re;
    }
    static unshuffle(s) {
        let kindex = s.charCodeAt(s.length - 1);
        s = s.substring(0, s.length - 1);
        let sp = s.substring(0, kindex);
        let pp = s.substring(kindex);
        sp = sp.split('').reverse().join('');
        s = sp + pp;
        let re = "";
        for (let k = 0; k < s.length; ++k) {
            let ch = s.charAt(k) + "";
            if (k % 2 == 0) {
                ch = String.fromCharCode(ch.charCodeAt(0) - 1);
            } else {
                ch = String.fromCharCode(ch.charCodeAt(0) + 1);
            }
            re += ch;
        }
        return re;
    }
    static shuffle(s) {

        let re = "";
        for (let k = 0; k < s.length; k++) {
            let ch = s.charAt(k) + "";
            if (k % 2 === 0) {
                ch = String.fromCharCode(ch.charCodeAt(0) + 1);
            } else {
                ch = String.fromCharCode(ch.charCodeAt(0) - 1);
            }
            re += ch;
        }
        let pos = 0;
        while (pos === 0) {
            pos = Math.floor(Math.random() * (re.length - 1));
        }
        let sp = re.substring(0, pos);
        let pp = re.substring(pos);


        let arr = sp.split('');
        arr.reverse();
        sp = arr.join('');

        re = sp + pp;
        return re + String.fromCharCode(pos);
    }
    static encrypt(req) {
        let key = Math.floor((Math.random() * 10000) + 200);
        //	int key=r.nextInt(10000)+200;
        let bb = "";
        for (let a = 0; a < req.length; ++a) {
            bb += String.fromCharCode(req.charCodeAt(a) + key);
        }
        bb += String.fromCharCode(key);
        return bb;
    }
    static decrypt(s) {
        let key = s.charCodeAt(s.length - 1);
        let bb = "";
        for (let a = 0; a < s.length - 1; ++a) {
            bb += String.fromCharCode(s.charCodeAt(a) - key);
        }
        return bb;
    }

}

function boom() {
    let inp = window.document.getElementById("23");
    let bEnc = inp.value.split("\n");
    let psswd = "";
    let flag;
    do {
        psswd = prompt("Would you like to password-lock this encryption?\n Click cancel if you'd like to encrypt without a password.");
        if (psswd === null) {
            break;
        }
        flag = (psswd.length == 0) || (psswd.indexOf(" ") != -1);
        if (flag) {
            alert("Invalid Password, password cannot be empty or have spaces.");
        }
    }
    while (flag);
    bEnc = bEnc.map((elem) => {
        return Encrypter.doEncryption(elem);
    });
    let string = "";
    if (psswd === null) {
        string = "false";
    } else {
        string = "true" + " " + psswd;
    }
    string = Encrypter.encrypt(string) + "\n";
    let tex = string + bEnc.join("\n");
    let out = window.document.getElementById("24");
    out.value = tex

}
//Decryption routine final
function antiBoom() {
    let inp = window.document.getElementById("23");
    let bdec = inp.value;
    let sens = bdec.split("\n");
    let pass = Encrypter.decrypt(sens.shift()).split(" ");
    if (pass[0] === "true") {
        userp = prompt("This encryption is password protected, please enter the password this message was locked");
        if (userp === null) {
            return;
        } else if (!(userp === pass[1])) {
            alert("Incorrect Password entered, try again.");
            return;
        }
    } else if (pass[0] !== "false") {
        alert("This message was either tampered with or encrypted with an older version of the application and can no longer be decrypted.");
        return;
    }
    sens = sens.map((elem) => {
        return Encrypter.doDecryption(elem);
    });
    let tex = sens.join("\n");
    let out = window.document.getElementById("24");
    out.value = tex;

}
let tf = window.document.getElementById("23");
let ta = window.document.getElementById("24");
let button = document.getElementById("CIPHER");

function logger(e) {
    //let text = tf.value;
    let op = window.document.getElementById("enc");
    if (op.value === "Encrypt") {
        boom();
    } else {
        antiBoom();
    }

}
button.addEventListener("click", logger);
let op1 = window.document.getElementById("enc");
op1.addEventListener("change", function() {
    button.textContent = op1.value;
    tf.value = "";
    ta.value = "";
});