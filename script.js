const uppercaseFull = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const lowercaseFull = "abcdefghijklmnopqrstuvwxyz".split("");
const symbolsFull = "~`!@#$%^&*()_-+={[}]|\\:;\"'<,>.?/".split("");
const numbersFull = "0123456789".split("");

function pickRandomFromArray(array) {
  let max = array.length - 1;
  let randomNum = Math.floor(Math.random() * (max + 1));
  return [array[randomNum], randomNum];
}

function excludeFromArray(array, arrayFull, index) {
  array.splice(index, 1);
  if (array.length == 0) {
    array = arrayFull.slice();
  }
  return array;
}

function getRandomElement(range, rangeFull, exclude) {
  // main function, makes a call to pickRandomFromArray and excludeFromArray (if exclude option is selected)
  return function () {
    let res = pickRandomFromArray(range);
    if (exclude) {
      range = excludeFromArray(range, rangeFull, res[1]);
    }
    return res[0];
  };
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

document.querySelector("#generate").onclick = function () {
  let uppercase = uppercaseFull.slice();
  let lowercase = lowercaseFull.slice();
  let symbols = symbolsFull.slice();
  let numbers = numbersFull.slice();

  let pickedTypes = [];

  let uppercaseCheckbox = document.querySelector("#uppercase").checked;
  let lowercaseCheckbox = document.querySelector("#lowercase").checked;
  let symbolsCheckbox = document.querySelector("#symbols").checked;
  let numbersCheckbox = document.querySelector("#numbers").checked;

  if (!uppercaseCheckbox && !lowercaseCheckbox && !symbolsCheckbox && !numbersCheckbox) {
    alert("Select at least one type of elements!");
  } else {
    exclude = document.querySelector("#exclude").checked;
    if (uppercaseCheckbox) {
      pickedTypes.push(getRandomElement(uppercase, uppercaseFull, exclude));
    }
    if (lowercaseCheckbox) {
      pickedTypes.push(getRandomElement(lowercase, lowercaseFull, exclude));
    }
    if (symbolsCheckbox) {
      pickedTypes.push(getRandomElement(symbols, symbolsFull, exclude));
    }
    if (numbersCheckbox) {
      pickedTypes.push(getRandomElement(numbers, numbersFull, exclude));
    }

    let passwordArray = [];
    for (let index in pickedTypes) {
      passwordArray.push(pickedTypes[index]());
    }

    for (let i = 0; i < document.querySelector("#length").value - pickedTypes.length; i++) {
      let max = pickedTypes.length - 1;
      passwordArray.push(pickedTypes[Math.floor(Math.random() * (max + 1))]());
    }

    shuffleArray(passwordArray);
    passwordString = passwordArray.join("");

    const passwordText = document.createElement("h2");
    passwordText.innerText = passwordString;
    const passwordDiv = document.querySelector("#password");
    passwordDiv.innerHTML = "";
    passwordDiv.append(passwordText);
  }
};

document.querySelector("#copy").onclick = function () {
  let password = document.querySelector("#password").innerText;
  if (password === "") {
    alert("Password has not been generated!");
  } else {
    navigator.clipboard.writeText(password);
    alert("Copied password: " + password);
  }
};
