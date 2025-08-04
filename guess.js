//Setting Game Name
let gameName = "Guess The word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector(
  "footer"
).innerHTML = `<span >${gameName}</span> Game enhaned By <span class="name">M.Hilal</span>`;
// Setting Game Options
let numbersOfTries = 8;
let numbersOfLetters = 6;
let currentTry = 1;
let numberOfHints = 3;

//Manage Game Options
let wordToGuess = "";
const word = [
  "Create",
  "Update",
  "Delete",
  "Master",
  "Branch",
  "Mainly",
  "Elzero",
  "School",
];
wordToGuess = word[Math.floor(Math.random() * word.length)].toLowerCase();
let messageArea = document.querySelector(".message");
console.log(wordToGuess);
//Manage Hints
document.querySelector(".hint span").innerHTML = numberOfHints;
const getHintButton = document.querySelector(".hint");
getHintButton.addEventListener("click", getHint);
//###################################################################
function generateInput() {
  const inputsContainer = document.querySelector(".inputs");

  for (let i = 1; i <= numbersOfTries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;

    if (i !== 1) tryDiv.classList.add("disabled-inputs");

    for (let j = 1; j <= numbersOfLetters; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter${j}`;
      input.setAttribute("maxlength", "1");
      tryDiv.appendChild(input);
    }
    inputsContainer.appendChild(tryDiv);
  }
  inputsContainer.children[0].children[1].focus();
  // Disabled All Inputs Except First One
  const inputsInDisabledDiv = document.querySelectorAll(
    ".disabled-inputs input"
  );
  inputsInDisabledDiv.forEach((input) => (input.disabled = true));

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      const nextInput = inputs[index + 1];
      if (nextInput) nextInput.focus();
    });
    input.addEventListener("keydown", function (event) {
      const currentIndex = Array.from(inputs).indexOf(event.target); // or this
      if (event.key === "ArrowRight") {
        const nextInput = currentIndex + 1;
        if (nextInput < inputs.length) inputs[nextInput].focus();
      }
      if (event.key === "Enter") {
        const nextInput = currentIndex + 1;
        if (nextInput < inputs.length) inputs[nextInput].focus();
      }
      if (event.key === "ArrowLeft") {
        const prevInput = currentIndex - 1;
        if (prevInput >= 0) inputs[prevInput].focus();
      }
      if (event.key === "Backspace") {
        const prevInput = currentIndex - 1; 
        if (prevInput >= 0) {
          this.value = "";
          inputs[prevInput].focus();
          inputs[prevInput].value = ""; 
        }
      }
    });
  });
}
//###################################################################
const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handleGuesses);

function handleGuesses() {
  let suuccessGuess = true;
  for (let i = 1; i <= numbersOfLetters; i++) {
    const inputField = document.querySelector(
      `#guess-${currentTry}-letter${i}`
    );
    const letter = inputField.value.toLowerCase();
    const actualLetter = wordToGuess[i - 1];
    //Game Logic
    if (letter === actualLetter) {
      inputField.classList.add("yes-in-place");
    } else if (wordToGuess.includes(letter) && letter !== "") {
      inputField.classList.add("word-not-in-place");
      suuccessGuess = false;
    } else {
      inputField.classList.add("no-word");
      suuccessGuess = false;
    }
  }
  //check If User Win Or Lose
  if (suuccessGuess) {
    messageArea.innerHTML = `You Win The Word Is <span>${wordToGuess}</span>`;
    if (numberOfHints === 3) {
      messageArea.innerHTML = `<p><span>Congratulations!</span> You Didn't use any hints!</p>`;
      messageArea.style.backgroundColor = "#051f69";
    }


    //Add Disabled Class On All Try Divs
    let allTries = document.querySelectorAll(".inputs > div");
    allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));
    //Disabled Guess Button
    guessButton.disabled = true;
    getHintButton.disabled = true;

let again = document.querySelector(".again");
again.innerHTML = "Play Again";
again.style.backgroundColor = "#09f611";
again.addEventListener("click", reloudPage);
  } else {
    document
      .querySelector(`.try-${currentTry}`)
      .classList.add("disabled-inputs");
    const currentTryInputs = document.querySelectorAll(
      `.try-${currentTry} input`
    );
    currentTryInputs.forEach((input) => (input.disabled = true));

    currentTry++;

    const nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
    nextTryInputs.forEach((input) => (input.disabled = false));

    let el = document.querySelector(`.try-${currentTry}`);
    if (el) {
      document
        .querySelector(`.try-${currentTry}`)
        .classList.remove("disabled-inputs");
      el.children[1].focus();
    } else {
      //Disabled Guess Button
      guessButton.disabled = true;
      getHintButton.disabled = true;
      messageArea.innerHTML = `You Lose The Word Is <span>${wordToGuess}</span>`;
      messageArea.style.backgroundColor = "#051f69";
      //Add Disabled Class On All Try Divs
      let allTries = document.querySelectorAll(".inputs > div");
      allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));
      let again = document.querySelector(".again");
      again.innerHTML = "Play Again";
      again.style.backgroundColor = "#09f611";
      again.addEventListener("click", reloudPage);


    }
  }
}
//###################################################################
function getHint() {
  if (numberOfHints > 0) {
    numberOfHints--;
    document.querySelector(".hint span").innerHTML = numberOfHints;
  }
    if (numberOfHints === 0) {
      getHintButton.disabled = true;
    }

    const enabledInputs = document.querySelectorAll("input:not(:disabled)");
    const emptyEnablesInputs = Array.from(enabledInputs).filter((input) => input.value === "");

    if (emptyEnablesInputs.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyEnablesInputs.length);
      const randomInput = emptyEnablesInputs[randomIndex];
      const indexToFill = Array.from(enabledInputs).indexOf(randomInput);
      if (indexToFill !== -1) {
        randomInput.value = wordToGuess[indexToFill].toUpperCase();
      }
  }
}
function reloudPage() {
  window.location.reload();
}

window.onload = function () {
  generateInput();
};
