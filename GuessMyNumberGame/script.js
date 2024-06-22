'use strict';

// console.log(document.querySelector('.message').textContent);

// document.querySelector('.message').textContent = 'Correct Number !!!';

// console.log(document.querySelector('.message').textContent);
// console.log(document.querySelector('.guess').value);
// document.querySelector('.guess').value = 23;
// console.log(document.querySelector('.guess').value);

/* What's DOM and DOM manipulation 
To read more about DOMs read these articles : https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction#accessing_the_dom,
https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model

DOM : document object model. structured representation of html documents. It allows JS to access html elements ans manipulate them.

DOM tree structure. --> parent and child.
document object is the entry point to DOM (root element of the tree)

DOM and DOM methods are not part of JS.
They are part of Web APIs.
These APIs are implemented by browsers.
*/

const changeText = function (text, textFieldName) {
  document.querySelector(textFieldName).textContent = text;
};

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
    // document.querySelector('.message').textContent = 'Not a number!';
    changeText('Not a number!', '.message');
    return;
  }
  if (correctNumber === guessedNumber) {
    won = true;
    document.querySelector('.message').textContent = 'Correct Number';
    // console.log('Won');
    if (highScore < score) {
      highScore = score;
    }
    // document.querySelector('.highscore').textContent = highScore;
    // document.querySelector('.number').textContent = correctNumber;
    changeText(highScore, '.highscore');
    changeText(correctNumber, '.number');
    /*
      styling using DOM manipulation.
    */
    document.querySelector('body').style.backgroundColor = '#06b347';
    document.querySelector('.number').style.width = '30rem';
  } else {
    score--;
    if (score === 0) {
      // document.querySelector('.message').textContent = 'You Loose!';
      // document.querySelector('.score').textContent = score;
      changeText('You Loose!', '.message');
      changeText(score, '.score');
      return;
    }
    if (score === -1) {
      return;
    }
    // if (correctNumber < guessedNumber) {
    //   //   console.log('large number');
    //   // document.querySelector('.message').textContent = 'Too high';
    //   // document.querySelector('.score').textContent = score;
    //   changeText('Too high', '.message');
    //   changeText(score, '.score');
    // } else {
    //   //   console.log('large number');
    //   // document.querySelector('.message').textContent = 'Too Low';
    //   // document.querySelector('.score').textContent = score;
    //   changeText('Too Low', '.message');
    //   changeText(score, '.score');
    // }
    changeText(
      `Too ${correctNumber < guessedNumber ? 'high' : 'low'} `,
      '.message'
    );
    changeText(score, '.score');
  }
});

document.querySelector('.again').addEventListener('click', function (event) {
  won = false;
  score = 20;
  correctNumber = Math.trunc(Math.random() * 20 + 1);
  // document.querySelector('.message').textContent = 'Start guessing...';
  // document.querySelector('.score').textContent = score;
  // document.querySelector('.number').textContent = '?';
  // document.querySelector('.guess').value = '';
  changeText('Start guessing...', '.message');
  changeText(score, '.score');
  changeText('?', '.number');
  changeText('', '.guess');

  /*
      styling using DOM manipulation.
    */
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
