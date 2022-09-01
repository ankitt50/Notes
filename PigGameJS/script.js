'use strict';

/*
let score0El = document.querySelector('#score--0');
 */

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let currentScore0 = 0;
let currentScore1 = 0;
let score0 = 0;
let score1 = 0;

let isPlaying = true;

let isPlayer1 = true;

score0El.textContent = score0;
score1El.textContent = score1;
currentScore0El.textContent = currentScore0;
currentScore0El.textContent = currentScore1;

diceEl.classList.add('hidden');

/*
const tempFunc = function (arg) {
  console.log(this.score0);
  console.log(arg);
};
const tempFuncBind = tempFunc.bind(this);
*/

btnRoll.addEventListener('click', function () {
  if (!isPlaying) {
    return;
  }
  const dice = Math.trunc(Math.random() * 6) + 1;
  diceEl.src = `dice-${dice}.png`;
  diceEl.classList.remove('hidden');
  /*
  tempFunc(`${score0} : file level variable score0`);
  tempFunc(`${dice} : local level variable dice`);
  */

  if (isPlayer1) {
    if (dice === 1) {
      score0 = 0;
      currentScore0 = 0;
      isPlayer1 = false;
      /*
      player0El.classList.remove('player--active');
      player1El.classList.add('player--active');
      */

      player0El.classList.toggle('player--active');
      player1El.classList.toggle('player--active');
    } else {
      currentScore0 += dice;
    }
  } else {
    if (dice === 1) {
      score1 = 0;
      currentScore1 = 0;
      isPlayer1 = true;
      /*
      player1El.classList.remove('player--active');
      player0El.classList.add('player--active');
      */
      player0El.classList.toggle('player--active');
      player1El.classList.toggle('player--active');
    } else {
      currentScore1 += dice;
    }
  }
  score0El.textContent = score0;
  score1El.textContent = score1;
  currentScore0El.textContent = currentScore0;
  currentScore1El.textContent = currentScore1;
});

btnHold.addEventListener('click', function () {
  if (!isPlaying) {
    return;
  }
  if (isPlayer1) {
    score0 += currentScore0;
    currentScore0 = 0;

    if (score0 >= 30) {
      isPlaying = false;
      player0El.classList.add('player--winner');
      player0El.classList.remove('player--active');
    } else {
      /*
    player0El.classList.remove('player--active');
    player1El.classList.add('player--active');
    */
      player0El.classList.toggle('player--active');
      player1El.classList.toggle('player--active');
    }
  } else {
    score1 += currentScore1;
    currentScore1 = 0;

    if (score1 >= 30) {
      isPlaying = false;
      player1El.classList.add('player--winner');
      player1El.classList.remove('player--active');
    } else {
      /*
    player1El.classList.remove('player--active');
    player0El.classList.add('player--active');
    */
      player0El.classList.toggle('player--active');
      player1El.classList.toggle('player--active');
    }
  }
  score0El.textContent = score0;
  score1El.textContent = score1;
  currentScore0El.textContent = currentScore0;
  currentScore1El.textContent = currentScore1;
  isPlayer1 = !isPlayer1;
});

btnNew.addEventListener('click', function () {
  currentScore0 = 0;
  currentScore1 = 0;
  score0 = 0;
  score1 = 0;

  isPlaying = true;
  isPlayer1 = true;
  /*
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  */
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  score0El.textContent = score0;
  score1El.textContent = score1;
  currentScore0El.textContent = currentScore0;
  currentScore0El.textContent = currentScore1;

  diceEl.classList.add('hidden');
});
