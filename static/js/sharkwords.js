const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const WORDS = [
  'strawberry',
  'orange',
  'apple',
  'banana',
  'pineapple',
  'kiwi',
  'peach',
  'pecan',
  'eggplant',
  'durian',
  'peanut',
  'chocolate',
];

let numWrong = 0;
let numRight = 0;

// Loop over the chars in `word` and create divs.
//

const createDivsForChars = (word) => {
  const wordContainer = document.querySelector('#word-container');
  for (const letter of word) {
    wordContainer.insertAdjacentHTML('beforeend', `<div class="letter-box ${letter}"></div>`);
  }
};

// Loop over each letter in `ALPHABET` and generate buttons.
//
const generateLetterButtons = () => {
  const letterButtonContainer = document.querySelector('#letter-buttons');
  for (const char of ALPHABET) {
    letterButtonContainer.insertAdjacentHTML('beforeend', `<button>${char}</button>`);
  }
};

// Set the `disabled` property of `buttonEl` to `true.
//
// `buttonEl` is an `HTMLElement` object.
//
const disableLetterButton = (buttonEl) => {
  buttonEl.disabled = true;
};

const disableAllButtons = () => {
  for (const button of document.querySelectorAll('button')) {
    disableLetterButton(button)
  }
}

// Return `true` if `letter` is in the word.
//
const isLetterInWord = (letter) => document.querySelector(`div.${letter}`) !== null;

// Called when `letter` is in word. Update contents of divs with `letter`.
const handleCorrectGuess = (letter) => {
    matches = document.querySelectorAll(`.${letter}`);
    numRight += matches.length;

    for (let i = 0; i < matches.length; i++) {
      matches[i].innerHTML = letter;
    }
};

// Called when `letter` is not in word.
//
// Increment `numWrong` and update the shark image.
// If the shark gets the person (5 wrong guesses), disable
// all buttons and show the "play again" message.

const handleWrongGuess = (word) => {
  numWrong += 1;
  console.log(document.querySelector('#shark-img-link'))
  document.querySelector('#shark-img-link').src = `/static/images/guess${numWrong}.png`

  if (numWrong === 5) {
    disableAllButtons();
    document.querySelector('#reveal-word').innerHTML = `The word was ${word}`;
    document.querySelector('.play-again').style.display = 'block';
  }
};

//  Reset game state. Called before restarting the game.
const resetGame = () => {
  window.location = '/sharkwords';
};

// This is like if __name__ == '__main__' in Python
//
(function startGame() {

  const word = WORDS[Math.floor(Math.random() * WORDS.length)]


  createDivsForChars(word);
  generateLetterButtons();

  for (const button of document.querySelectorAll('button')) {
    // add an event handler to handle clicking on a letter button
    // YOUR CODE HERE
    button.addEventListener('click', (e) => {
      disableLetterButton(button);
      letter = e.target.innerHTML;
      if (isLetterInWord(letter)) {
        handleCorrectGuess(letter);
        if (numRight === word.length) {
          win_els = document.querySelectorAll('.win')
          for (let el of win_els) {
            el.style.display = 'block';
          }
          disableAllButtons();
        }
      } else {
        handleWrongGuess(word);
      }
    })
  }

  // add an event handler to handle clicking on the Play Again button
  const links = document.querySelectorAll('.play-again');

  for (let el of links) {
    el.addEventListener('click', resetGame);
  }

})();
