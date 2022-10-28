const imgcontainer = document.querySelector(".image-container");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

let a = 0;
let timeout;

prev.addEventListener("click", () => {
  a = a + 45;
  clearTimeout(timeout);
  updategellary();
});

next.addEventListener("click", () => {
  a = a - 45;
    clearTimeout(timeout);
  updategellary();
});

function updategellary() {
  imgcontainer.style.transform = `perspective(1000px) rotateY(${a}deg)`;
  timeout=setTimeout(() => {
    a = a - 45;

    updategellary();
  }, 4000);
}
updategellary();
