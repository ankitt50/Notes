'use strict';

// console.log(document.querySelector('.message').textContent);

// document.querySelector('.message').textContent = 'Correct Number !!!';

// console.log(document.querySelector('.message').textContent);
// console.log(document.querySelector('.guess').value);
// document.querySelector('.guess').value = 23;
// console.log(document.querySelector('.guess').value);

/* What's DOM and DOM manipulation 
DOM : document object model. structured representation of html documents. It allows JS to access html elements ans manipulate them.

DOM tree structure. --> parent and child.
document object is the entry point to DOM (root element of the tree)

DOM and DOM methods are not part of JS.
They are part of Web APIs.
These APIs are implemented by browsers.
*/

let won = false;
let score = 20;
let correctNumber = Math.trunc(Math.random() * 20 + 1);
let highScore = 0;
// console.log(correctNumber);

/* Handling a click of the button */
document.querySelector('.check').addEventListener('click', function (event) {
  if (won) {
    // console.log('Won');
    return;
  }
  const guessedNumber = Number(document.querySelector('.guess').value);
  //   console.log(guessedNumber + ': guessed number');
  //   console.log(guessedNumber);
  //   console.log(correctNumber + ': correct number');
  //   console.log(correctNumber);
  if (score < 0) {
    return;
  }
  if (!guessedNumber) {
    // console.log('Won');
    document.querySelector('.message').textContent = 'Not a number!';
    return;
  }
  if (correctNumber === guessedNumber) {
    won = true;
    document.querySelector('.message').textContent = 'Correct Number';
    // console.log('Won');
    if (highScore < score) {
      highScore = score;
    }
    document.querySelector('.highscore').textContent = highScore;
    document.querySelector('.number').textContent = correctNumber;
    /*
      styling using DOM manipulation.
    */
    document.querySelector('body').style.backgroundColor = '#06b347';
    document.querySelector('.number').style.width = '30rem';
  } else {
    score--;
    if (score === 0) {
      document.querySelector('.message').textContent = 'You Loose!';
      document.querySelector('.score').textContent = score;
      return;
    }
    if (score === -1) {
      return;
    }
    if (correctNumber < guessedNumber) {
      //   console.log('large number');
      document.querySelector('.message').textContent = 'Too high';
      document.querySelector('.score').textContent = score;
    } else {
      //   console.log('large number');
      document.querySelector('.message').textContent = 'Too Low';
      document.querySelector('.score').textContent = score;
    }
  }
});

document.querySelector('.again').addEventListener('click', function (event) {
  won = false;
  score = 20;
  correctNumber = Math.trunc(Math.random() * 20 + 1);
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  /*
      styling using DOM manipulation.
    */
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
