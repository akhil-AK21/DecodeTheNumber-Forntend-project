//document.querySelector(".message").addClass() = "hi";

//SLECTORS...
// let input = [];
// const entered = [];

// document.querySelector(".digit3").focus();
let roundScore;
let number;
let bestScore = 0;
let msg = document.querySelector(".message");
let clues = document.querySelector(".history");
const submitted = document.querySelector(".btn-submit");
const digit0 = document.querySelector(".digit0");
let ff = document.querySelectorAll(".digits");
let bstScore = document.querySelector(".best-score");

function changeShake() {
  ff.forEach((elem) => elem.classList.remove("shake-it"));
}
//CODE FOR RANDOM NUMBER GENERATOR
const genNum = () => {
  let temp4 = Math.trunc(Math.random() * 8 + 1);

  const unique = new Set();
  unique.add(temp4);
  // unique.has(temp4);

  while (unique.size < 4) {
    const tempUnique = Math.trunc(Math.random() * 10);

    if (!unique.has(tempUnique)) {
      unique.add(tempUnique);
    }
  }
  // console.log(unique);
  // console.log(digit4, number);
  // for (let i = 0; i < 3; i++) {
  //   number.push(Math.trunc(Math.random() * 10));
  //   // console.log(number);
  // }
  return [...unique];
  // msg.textContent = "Let's Decode...!";
  // msg.style.color = "yellow";
  // console.log(number, unique);
};
const initial = () => {
  let input = [];
  const entered = [];
  submitted.disabled = false;
  msg.textContent = "Let's Decode...!";
  msg.style.color = "yellow";
  clues.textContent = "";
  roundScore = 0;
  number = genNum();
  bstScore.textContent = bestScore;
  ff.forEach((el) => {
    el.style.backgroundColor = "white";
    el.disabled = false;
    el.classList.remove("shake-it");
    el.value = "";
  });
};
initial();

// const errorM = function (clr, j) {
//   document.querySelector(`.digit${j}`).style.color = clr;
// };
const errorNum = () => {
  msg.textContent = "Enter Valid Number....!";
  msg.style.color = "red";

  ff.forEach((el) => {
    el.classList.add("shake-it");
    el.value = "";
    el.style.backgroundColor = "black";
  });
};

// FOCUS CHANGE FOR DIGIT 0-9
// console.log(ff[0]);
ff.forEach((el) =>
  el.addEventListener("keyup", (f) => {
    // console.log(f, el.value);
    el.style.backgroundColor = "yellow";

    const presDigit = Number(f.key);

    if (f.key !== "0" && !presDigit) {
      el.style.backgroundColor = "orange";
    } else if (el.nextElementSibling) {
      el.nextElementSibling.focus();

      // console.log("CHANGED");
      // el.backgroundColor = "black";
    }
  })
);

// for (let i = 0; i < ff.length; i++) {
//   ff[i].addEventListener("keyup", function (e) {
//     // console.log(i + " I");

//     // console.log(e.key, i);
//     const present = Number(e.key);
//     if (present >= 0 && present < 10) {
//       errorM("green", i);

//       x = document.querySelector(`.digit${i}`);
//       // console.log(x.value);
//       if (i + 1 <= 3 && x.value / 10 < 1) {
//         document.querySelector(`.digit${i + 1}`).focus();
//       }
//     } else {
//       errorM("red", i);
//     }

//     // console.log(x.value);
//     // console.log(present, `.digit${i + 1}`);
//   });
// }

const printCLues = function (num, cDigits, pDigits) {
  const str = `<br>${num} - ${cDigits} present , ${pDigits} placed correctly`;
  roundScore++;

  clues.innerHTML = str + clues.innerHTML;

  clues.focus();
  if (cDigits == 4 && pDigits == 4) {
    if (roundScore < bestScore || bestScore === 0) bestScore = roundScore;
    msg.textContent = "Kudos...Decoded Successfully!";
    msg.style.color = "green";
    submitted.disabled = true;
    // console.log(bestScore, roundScore);
    bstScore.textContent = bestScore;
  } else {
    msg.textContent = "OOPS Try Again...";
    msg.style.color = "red";
  }
};

const check = function () {
  changeShake();
  const entered = [];
  let enteredString = "";
  let crctCount = 0;
  let placedCount = 0;
  let single = false;
  for (let i = 0; i < 4; i++) {
    const tempDigit = Number(document.querySelector(`.digit${i}`).value);
    enteredString += document.querySelector(`.digit${i}`).value;
    // console.log("StringForEAch", enteredString);
    if (tempDigit / 10 < 1 && tempDigit >= 0 && enteredString.length == i + 1) {
      single = true;
      // console.log(tempDigit, tempDigit / 10 < 1);
    } else {
      errorNum();
      return;
    }

    entered.push(Number(document.querySelector(`.digit${i}`).value));
    // console.log(document.querySelector(`.digit${i}`).value);
  }

  // console.log(entered, single);
  const enteredOrg = [...new Set(entered)];
  // console.log(enteredOrg);
  if (!enteredOrg.includes(NaN) || single) {
    for (let i = 0; i < 4; i++) {
      if (entered[i] === number[i]) {
        placedCount++;
      }
      // console.log(number.indexOf(entered[i]));
      if (number.indexOf(enteredOrg[i]) >= 0) {
        crctCount++;
      }
    }

    // console.log(entered, entered.join(""));

    printCLues(entered.join(""), crctCount, placedCount);

    // console.log(crctCount, placedCount);
  } else {
    errorNum();
  }
};

submitted.addEventListener("click", check);

document.querySelector(".btn-restart").addEventListener("click", () => {
  initial();
});
