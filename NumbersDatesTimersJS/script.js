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
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
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

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

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
  console.log(currentAccount);

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
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
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
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
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
