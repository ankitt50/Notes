'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2022-09-29T09:15:04.904Z',
    '2022-09-30T10:17:24.185Z',
    '2022-10-01T14:11:59.604Z',
    '2022-10-02T17:01:17.194Z',
    '2022-10-03T23:36:17.929Z',
    '2022-10-04T00:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const currentDateLabel = document.querySelector('.date');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const formatNum = function (mov, locale, currency) {
  return Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(mov.toFixed(2));
};

const displayMovements = function (
  movements,
  sort = false,
  currentAccount = null
) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const movDate = new Date(currentAccount.movementsDates[i]);
    /*
    let movDateStr = `${movDate.getDate()}/${
      movDate.getMonth() + 1
    }/${movDate.getFullYear()}`;
    */
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };
    let movDateStr = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(movDate);

    const movFormatted = formatNum(
      mov,
      currentAccount.locale,
      currentAccount.currency
    );

    const daysPassed = Math.abs(
      Math.trunc((new Date() - movDate) / (1000 * 60 * 60 * 24))
    );
    if (daysPassed <= 7) movDateStr = `${daysPassed} days ago`;
    if (daysPassed === 1) movDateStr = 'yesterday';
    if (daysPassed === 0) movDateStr = 'today';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${currentAccount && movDateStr}</div>
        <div class="movements__value">${movFormatted}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatNum(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out.toFixed(2))}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

let timerForLogout;
let timeOutInterval;

const startTimerForLogout = function () {
  if (timerForLogout) {
    clearInterval(timerForLogout);
  }
  timeOutInterval = 30;
  const min = String(Math.trunc(timeOutInterval / 60)).padStart(2, '0');
  const secs = String(Math.trunc(timeOutInterval % 60)).padStart(2, '0');
  labelTimer.textContent = `${min}:${secs}`;
  timeOutInterval--;

  timerForLogout = setInterval(function () {
    if (timeOutInterval === 0) {
      containerApp.style.opacity = 0;
      labelWelcome.textContent = 'Log in to get started';
      clearInterval(timerForLogout);
    }
    const min = String(Math.trunc(timeOutInterval / 60)).padStart(2, '0');
    const secs = String(Math.trunc(timeOutInterval % 60)).padStart(2, '0');
    labelTimer.textContent = `${min}:${secs}`;
    timeOutInterval--;
  }, 1000);
};

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements, false, acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);

    // update date in the UI
    const currDate = new Date();
    /*
    currentDateLabel.textContent = `${currDate
      .getDate()
      .toString()
      .padStart(2, '0')}/${(currDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${currDate.getFullYear()}, ${currDate
      .getHours()
      .toString()
      .padStart(2, '0')}:${currDate.getMinutes().toString().padStart(2, '0')}`;
      */
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };
    currentDateLabel.textContent = new Intl.DateTimeFormat(
      // navigator.location,
      currentAccount.locale,
      options
    ).format(currDate);

    startTimerForLogout();
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movements.push(amount);
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    startTimerForLogout();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    /*
    // Add movement
    currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    // Update UI
    updateUI(currentAccount);
    */
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());
      // Update UI
      updateUI(currentAccount);
    }, 2500);
  }
  inputLoanAmount.value = '';
  startTimerForLogout();
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
  // startTimerForLogout();
  clearInterval(timerForLogout);
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted, currentAccount);
  sorted = !sorted;
  startTimerForLogout();
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/* Numbers conversion and checking */

//console.log(23 === 23.0); // true
// internally all numbers in JS are represented as flaoting point numbers.
// So, the above equality check returns true.
// Also, numbers are internally in base 2 format (i.e. binary format) and not base 10 format.
// base 10 format : 0 to 9
// base 2 format : 0 and 1 only
/*
console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false
*/

/*
//converting string to number
const str = '23';
console.log(Number('23')); //23
console.log(+'23', typeof +'23'); //23 number
console.log(+str, typeof +str); //23 number
console.log(-'23', typeof -'23'); //-23 number
*/

// parsing
/* parsing for Numbers
console.log(Number.parseInt('30px')); // 30
console.log(Number.parseInt('12px34')); //12
console.log(Number.parseInt('px34')); //NaN
console.log(Number.parseInt(' 2.5 ')); //2
console.log(Number.parseFloat('  2.5')); //2.5

// checking isNaN
//  Only values of the type number, that are also NaN, result in true
console.log(Number.isNaN('XYZ')); // false
console.log(Number.isNaN('23')); // false
console.log(Number.isNaN('20')); // false
console.log(Number.isNaN(+'XYZ')); // true
console.log(Number.isNaN(20 / 0)); //false

// best way to check if a value is a number
// isFinite() method :
// Only finite values of the type number, result in true.
console.log(Number.isFinite('23')); // false
console.log(Number.isFinite(+'23')); // true
console.log(Number.isFinite(20 / 0)); // false

// check is value is an integer
// isInteger() : Returns true if the value passed is an integer, false otherwise.
console.log(Number.isInteger('23')); //false
console.log(Number.isInteger(+'23')); //true
console.log(Number.isInteger(23.5)); //false
console.log(Number.isInteger(23.0)); //true
console.log(Number.isInteger(23 / 0)); //false
*/

/*
// Math
console.log(Math.sqrt(16)); //4
console.log(16 ** (1 / 2)); //4 --> square root
console.log(125 ** (1 / 3)); //5 --> cube root
console.log(Math.max(5, 10, 15, '23', 54, 6, 7, 90, 12, 15, 13)); //90
console.log(Math.max(5, 10, 15, '23', 54, 6, 7, 90, 12, 15, 13)); //90
console.log(Math.min(5, 10, 15, '23', 54, 6, 7, 90, 12, 15, 13)); //5
console.log(Math.PI * Number.parseFloat('23px') ** 2); // PI * radius * radius

// generate randon numbers
console.log(Math.trunc(Math.random() * 6) + 1); // values between 1 and 6

// generalized method to generate randon numbers
const generateRandomNumbers = (max, min) =>
  Math.trunc(Math.random() * (max - min + 1)) + min;
*/

/*
let ten = 0;
let eleven = 0;
let twelve = 0;
let thirteen = 0;
let otherValues = 0;

for (let i = 1; i <= 10000; i++) {
  const randomValue = generateRandomNumbers(13, 10);
  if (randomValue === 10) {
    ten++;
  } else if (randomValue === 11) {
    eleven++;
  } else if (randomValue === 12) {
    twelve++;
  } else if (randomValue === 13) {
    thirteen++;
  } else {
    otherValues++;
  }
}

console.log(
  `ten : ${ten}, eleven : ${eleven}, twelve : ${twelve}, thirteen : ${thirteen}, others : ${otherValues}`
);
*/

/*
//Rounding integers
// All these methods also do type coersion, so even string as a parameter will work.
console.log(Math.trunc(23.9)); //23
console.log(Math.trunc('23.9')); //23
console.log('-----');
console.log(Math.trunc(-23.9)); //-23
console.log(Math.trunc(-23.3)); //-23
console.log('-----');
console.log(Math.round(23.9)); //24
console.log(Math.round(23.3)); //23
console.log(Math.ceil(23.3)); //24
console.log(Math.ceil(23.9)); //24
console.log('-----');
console.log(Math.ceil(-23.3)); //-23
console.log(Math.ceil(-23.9)); //-23
console.log('-----');
console.log(Math.floor(23.3)); //23
console.log(Math.floor(23.9)); //23
console.log(Math.floor(23.9)); //23
console.log(Math.floor(-23.9)); //-24
console.log(Math.floor(-23.3)); //-24
*/

/*
//Rounding Decimals
let decimalNum = 23.9655;
//Returns a string
// argument represents the Number of digits after the decimal point.
console.log(decimalNum.toFixed(0)); //24
console.log(decimalNum.toFixed(3)); //23.965
console.log(decimalNum.toFixed(2)); //23.97
console.log(decimalNum.toFixed(1)); //24.0
*/
/*
let decimalNum = -23.9655;
console.log(decimalNum.toFixed(1)); //-24.0
*/

// Remainder operator
/*
const isEven = n => n % 2 === 0;
console.log(isEven(23)); //false
console.log(isEven(234)); // true
*/

/*
labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (
    row,
    idx
  ) {
    if (idx % 2 === 0) row.style.backgroundColor = 'orangered';
    if (idx % 3 === 0) row.style.backgroundColor = 'blue';
  });
});
*/

/*
// Numeric separator
// should be between numbers only, can't be at the end of number or start of number.
// also can't be between a number and decimal point.
const earthDiameter = 287_460_000_000;
console.log(earthDiameter); //287460000000
console.log(287_486 === 287486); //true
const decimalNum = 1.2_2;
console.log(decimalNum); //1.22
//decimalNum = 1_.22; // SyntaxError: underscore can appear only between digits, not after the last digit in a number
*/

/*
// BigInt (ES6)
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991 (The value of the largest integer in JS i.e. 2^53 - 1 )

let bigIntNum = 9007199254740991n;
bigIntNum += bigIntNum;
console.log(bigIntNum); //18014398509481982n
bigIntNum *= 2n;
// don't mix bigInt with other numbers during operations. Except when using comparison operators like equality and greater than.
// bigIntNum *= 2; //TypeError: can't convert BigInt to number
console.log(bigIntNum); //36028797018963964n
console.log(bigIntNum === 20000000); // false
console.log(bigIntNum > 2000000000); // true
console.log(20n == 20); // true
console.log(20n === 20); // false

// The Math operators don't work for BigInt
//console.log(Math.sqrt(16n)); //TypeError: can't convert BigInt to number

*/

/*
//create date in JS

console.log(new Date()); //  Wed Sep 28 2022 09:27:12 GMT+0530 (India Standard Time)
console.log(new Date('Sep 28 2022')); //  Wed Sep 28 2022 00:00:00 GMT+0530 (India Standard Time)
console.log(new Date('24 May 1993')); // Mon May 24 1993 00:00:00 GMT+0530 (India Standard Time)
console.log(new Date('May 31 1994')); // Tue May 31 1994 00:00:00 GMT+0530 (India Standard Time)
console.log(new Date(1993, 5, 24)); // Thu Jun 24 1993 00:00:00 GMT+0530 (India Standard Time)
// this is showing June, bcoz months are zero-based. So, Jan is represented by zero and not one.

console.log(account1.movementsDates[0]); // 2019-11-18T21:31:17.178Z
console.log(new Date(account1.movementsDates[0])); // Tue Nov 19 2019 03:01:17 GMT+0530 (India Standard Time)

console.log(new Date(0)); // Thu Jan 01 1970 05:30:00 GMT+0530 (India Standard Time)
// below example we are converting 3 days to milliseconds.
// 3 * 24 * 60 * 60 * 1000 = 259200000 (timestamp in milliseconds)
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // Sun Jan 04 1970 05:30:00 GMT+0530 (India Standard Time)
console.log(Date.now()); // 1664339694191 (current time timestamp in milliseconds)

// working with dates
let future = new Date(2037, 10, 19, 15, 23);
console.log(future); // Thu Nov 19 2037 15:23:00 GMT+0530 (India Standard Time)
console.log(future.getFullYear()); // 2037
console.log(future.getMonth()); // 10
console.log(future.getDate()); // 19
console.log(future.getDay()); // 4 (week starts from sunday and is zero-indexed.)
console.log(future.toISOString()); // 2037-11-19T09:53:00.000Z
console.log(future.getTime()); // 2142237180000 (timestamp in milliseconds).

future = new Date(2037, 0, 18, 15, 23);
console.log(future); // Sun Jan 18 2037 15:23:00 GMT+0530 (India Standard Time)
console.log(future.getFullYear()); // 2037
console.log(future.getMonth()); // 0
console.log(future.getDate()); // 18
console.log(future.getDay()); // 0 (week starts from sunday and is zero-indexed.)
*/

/*
currentAccount = account1;
updateUI(account1);
containerApp.style.opacity = 1;
const currDate = new Date();
currentDateLabel.textContent = `${currDate.getDate()}/${
  currDate.getMonth() + 1
}/${currDate.getFullYear()}`;
*/

/*
// operations with dates
const futureDate = new Date(2037, 5, 24, 0, 0);
console.log(+futureDate); //2129394600000

const calcDateDiff = (date1, date2) => date2 - date1;
console.log(
  calcDateDiff(new Date(2037, 5, 24, 0, 0), new Date(2037, 5, 31, 0, 0))
); //604800000 (in milliseconds)
console.log(
  calcDateDiff(new Date(2037, 5, 24, 0, 0), new Date(2037, 5, 31, 0, 0)) /
    (1000 * 60 * 60 * 24)
); // 7 (in days)
console.log(
  calcDateDiff(new Date(2037, 5, 31, 0, 0), new Date(2037, 5, 24, 0, 0)) /
    (1000 * 60 * 60 * 24)
); // -7 (in days)
*/

/* JS internationalization API (using it for dates)
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
*/
/*
const now = new Date();
console.log(new Intl.DateTimeFormat('en-US').format(now)); // 10/4/2022
console.log(new Intl.DateTimeFormat('en-IN').format(now)); // 4/10/2022
console.log(new Intl.DateTimeFormat('en-UK').format(now)); // 04/10/2022

// TO GET ISO CODES (DATE LOCALE STRINGS) CAN USE THIS WEBSITE : http://www.lingoes.net/en/translator/langcode.htm

// to get locale from user's browser
console.log(navigator.language); // en-US
*/

/*
const options = {
  minute: 'numeric',
  hour: 'numeric',
  day: 'numeric',
  month: 'long',
};
const options2 = {
  minute: 'numeric',
  hour: 'numeric',
  day: '2-digit',
  month: '2-digit',
};
const options3 = {
  minute: 'numeric',
  hour: 'numeric',
  day: 'numeric',
  month: 'numeric',
};
const options4 = {
  minute: 'numeric',
  hour: 'numeric',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  weekday: 'long',
};
const now = new Date();
console.log(new Intl.DateTimeFormat('en-US', options).format(now)); // October 4 at 9:28 AM
console.log(new Intl.DateTimeFormat('en-US', options2).format(now)); // 10/04, 9:30 AM
console.log(new Intl.DateTimeFormat('en-US', options3).format(now)); // 10/4, 9:30 AM
console.log(new Intl.DateTimeFormat('en-US', options4).format(now)); // Tuesday, October 4, 2022 at 10:11 AM10:11 AM
*/

/*internationalizing numbers*/
/*
const numb = 3005009;
console.log(new Intl.NumberFormat('en-US').format(numb)); //3,005,009
console.log(new Intl.NumberFormat('en-IN').format(numb)); //30,05,009
*/

/*
const numb = 3005009;
const options = {
  style: 'unit',
  unit: 'mile-per-hour',
};

const options2 = {
  style: 'unit',
  unit: 'celsius',
};

const options3 = {
  style: 'percent',
};
const options4 = {
  style: 'currency',
  currency: 'INR',
};
console.log(new Intl.NumberFormat('en-US', options).format(numb)); //3,005,009 mph
console.log(new Intl.NumberFormat('en-US', options2).format(numb)); //3,005,009°C
console.log(new Intl.NumberFormat('en-US', options3).format(numb)); //300,500,900%
console.log(new Intl.NumberFormat('en-US', options4).format(numb)); //₹3,005,009.00
*/

/* Timers in JS (setTimeout and setInterval) */
/*
setTimeout(() => {
  console.log('Please take your pizza.');
}, 3000); // callbcak function executed after 3 seconds
console.log('Waiting.....'); // this gets executed first and then setTimeout callback function is executed.
*/

/*
// we can also pass arguments to the callback function.
setTimeout(
  (ing1, ing2) => {
    console.log(`Please take your pizza with ${ing1} and ${ing2}`);
  },
  3000,
  'olives',
  'mushrooms'
); // callback function executed after 3 seconds
console.log('Waiting.....'); // this gets executed first and then setTimeout callback function is executed.
*/

// we can also clear the timeout before it is executed.
/*
const ingredients = ['olives', 'spinach'];
const pizzaTimeout = setTimeout(
  (ing1, ing2) => {
    console.log(`Please take your pizza with ${ing1} and ${ing2}`);
  },
  3000,
  ...ingredients
);
console.log('Waiting.....');
if (ingredients.includes('spinach')) clearTimeout(pizzaTimeout);

const ingredients2 = ['olives', 'mushroom'];
const pizzaTimeout2 = setTimeout(
  (ing1, ing2) => {
    console.log(`Please take your pizza with ${ing1} and ${ing2}`);
  },
  3000,
  ...ingredients2
);
console.log('Waiting.....');
if (ingredients2.includes('spinach')) clearTimeout(pizzaTimeout2);
*/

// setInterval is used to repeat the execution after a certain interval.
/*
setInterval(function () {
  console.log(new Date());
}, 2000);
*/
