// let i = 1;
// let j = 0;
// let arr = [];
// let c = 0;
// let game = () => {
//   level(i, c);
// };
// let level = (y, z) => {
//   document.querySelector("h1").innerHTML = "LEVEL 1";
//   let x1 = document.getElementById("green");
//   let x2 = document.getElementById("red");
//   let x3 = document.getElementById("yellow");
//   let x4 = document.getElementById("blue");
//   let j = 0;

//   let arr = [];
//   let step = (z) => {
//     let x = Math.ceil(Math.random() * 4);
//     if (x == 1) {
//       arr.push(`green`);
//       x1.style.backgroundColor = "grey";
//       setTimeout(() => {
//         x1.style.backgroundColor = "green";
//       }, 1000);
//     } else if (x == 2) {
//       arr.push(`red`);
//       x2.style.backgroundColor = "grey";
//       setTimeout(() => {
//         x2.style.backgroundColor = "red";
//       }, 1000);
//     } else if (x == 3) {
//       arr.push(`yellow`);
//       x3.style.backgroundColor = "grey";
//       setTimeout(() => {
//         x3.style.backgroundColor = "yellow";
//       }, 1000);
//     } else {
//       arr.push(`blue`);
//       x4.style.backgroundColor = "grey";
//       setTimeout(() => {
//         x4.style.backgroundColor = "blue";
//       }, 1000);
//     }
//     j++;
//   };
//   step(j);
//   if (j == i) {
//     let c = 0;
//     let isCorrect = (ev) => {
//       if (ev.target.id == arr[c]) {
//         c++;
//         if (c == arr.length) {
//           i++;
//           j = 0;
//           level(i + 1, j);
//           return;
//         }
//       } else {
//         document.querySelector("h1").innerHTML = "Game Over";
//       }
//     };
//     x1.addEventListener("click", isCorrect);
//     x2.addEventListener("click", isCorrect);
//     x3.addEventListener("click", isCorrect);
//     x4.addEventListener("click", isCorrect);
//   } else {
//     level(i, j + 1);
//   }
// };

// document.addEventListener("keypress", game);
let i = 1;
let game = () => {
  level(i);
};
let level = (y) => {
  document.querySelector("h1").innerHTML = "LEVEL" + i;
  let x1 = document.getElementById("green");
  let x2 = document.getElementById("red");
  let x3 = document.getElementById("yellow");
  let x4 = document.getElementById("blue");
  let j = 0;

  let arr = [];
  step = (j) => {
    let x = Math.ceil(Math.random() * 4);
    if (x == 1) {
      arr.push(`green`);
      x1.style.backgroundColor = "grey";
      setTimeout(() => {
        x1.style.backgroundColor = "green";
        j++;
        if (j < i) {
          setTimeout(() => {
            step(j);
          }, 500);
        }
      }, 1000);
    } else if (x == 2) {
      arr.push(`red`);
      x2.style.backgroundColor = "grey";
      setTimeout(() => {
        x2.style.backgroundColor = "red";
        j++;
        if (j < i) {
          setTimeout(() => {
            step(j);
          }, 500);
        }
      }, 1000);
    } else if (x == 3) {
      arr.push(`yellow`);
      x3.style.backgroundColor = "grey";
      setTimeout(() => {
        x3.style.backgroundColor = "yellow";
        j++;
        if (j < i) {
          setTimeout(() => {
            step(j);
          }, 500);
        }
      }, 1000);
    } else {
      arr.push(`blue`);
      x4.style.backgroundColor = "grey";
      setTimeout(() => {
        x4.style.backgroundColor = "blue";
      }, 1000);
      j++;
      if (j < i) {
        setTimeout(() => {
          step(j);
        }, 500);
      }
    }
  };
  step(j);
  let c = 0;
  let isCorrect = (ev) => {
    console.log(arr, c);
    if (ev.target.id == arr[c]) {
      c++;
      if (c == arr.length) {
        i++;
        clearAllListners();
        level(i);
        return;
      }
    } else {
      document.querySelector("h1").innerHTML = "Game Over";
      return;
    }
  };

  let clearAllListners = () => {
    x1.removeEventListener("click", isCorrect);
    x2.removeEventListener("click", isCorrect);
    x3.removeEventListener("click", isCorrect);
    x4.removeEventListener("click", isCorrect);
  };

  x1.addEventListener("click", isCorrect);
  x2.addEventListener("click", isCorrect);
  x3.addEventListener("click", isCorrect);
  x4.addEventListener("click", isCorrect);
};

document.addEventListener("keypress", game);
