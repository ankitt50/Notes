'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/* Simple Array Methods */

//slice method : returns a new array.
let alphabets = ['a', 'b', 'c', 'd', 'e'];
console.log(alphabets.slice(2)); // [ "c", "d", "e" ]
console.log(alphabets.slice(2, 4)); // [ "c", "d" ]
console.log(alphabets.slice()); // creates a shallow copy of the array. // op : [ "a", "b", "c", "d", "e" ]

// splice method : mutates the original array itself
// console.log(alphabets.splice(1, 2)); // [ "b", "c" ]
// console.log(alphabets); // [ "a", "d", "e" ]

// In splice method, the second parameter represents the number of elements to be deleted.
// But in slice method, the second parameter represents the index of the element to not include in the final result.
console.log(alphabets.splice(-1)); // to delete the last elements // op: [ "e" ]
console.log(alphabets); // op :  [ "a", "b", "c", "d" ]

// reverse method  mutates the original array itself
alphabets = ['f', 'e', 'd', 'c', 'b', 'a'];
console.log(alphabets.reverse()); // [ "a", "b", "c", "d", "e", "f" ]
console.log(alphabets); // [ "a", "b", "c", "d", "e", "f" ]

// concat method : doesn't mutate the original arrays
let nextAlphabets = ['g', 'h', 'i', 'j', 'k'];
console.log(alphabets.concat(nextAlphabets)); // [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k" ]
console.log(alphabets); // [ "a", "b", "c", "d", "e", "f" ]
console.log(nextAlphabets); // [ "g", "h", "i", "j", "k" ]

// at method (works for strings as well)
console.log(alphabets[alphabets.length - 1]); // to get last element // op: f
console.log(alphabets.at(-1)); // to get last element // op: f
console.log(alphabets.at(0)); // get first element // op: a

// for-each method
// continue and break statements don't work with for-each method.
// for-each also works with maps and sets
movements.forEach(function (movement, idx) {
  if (movement > 0) {
    console.log(`${idx + 1} : You have deposited ${movement}`);
  } else {
    console.log(`${idx + 1} : You have withdrawn ${Math.abs(movement)}`);
  }
});

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (movement, idx) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
<div class="movements__type movements__type--${type}">${idx + 1} ${type}</div>
<div class="movements__value">${Math.abs(movement)} €</div>
</div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);

/* Data Transformations : map, filter and reduce methods 
Map : to loop over array, and create a new array based on the original array and call back function.
Filter : filter elements in the original array based on certain condition and save all these elements in a new array.
reduce : reduces the entire array to a single value.
*/

// Map method
const eurToUsd = 1.1;
/*
const movementInUsd = movements.map(function (movement) {
  return Math.trunc(movement * eurToUsd);
});
*/
const movementInUsd = movements.map(movement =>
  Math.trunc(movement * eurToUsd)
);
// console.log(movementInUsd);
// console.log(movements);

// The map method is only creating a new array. Unlike forEach method, where we were logging it to console. This is called side-effect. Map method doesn't create side-effect.
const movementsDescription = movements.map(
  (movement, idx) =>
    `${idx + 1} : You have ${
      movement > 0 ? 'deposited' : 'withdrawal'
    } ${Math.abs(movement)}`
);
// console.log(movementsDescription);
const computeUserName = accs => {
  accs.forEach(acc => {
    // here we are making changes to the account object. This is a side-effect. So, we are using for-each methos and not map.
    acc.userName = acc.owner
      .split(' ')
      .map(value => value[0].toLowerCase())
      .join('');
  });
};
//console.log(computeUserName('Steven Thomas Williams')); //stw
computeUserName(accounts);

// Filter method
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
const withdrawls = movements.filter(function (mov) {
  return mov < 0;
});
// console.log(deposits); // [ 200, 450, 3000, 70, 1300 ]
// console.log(withdrawls); // [ -400, -650, -130 ]

// Reduce method

const displayBalance = function () {
  const balance = movements.reduce(
    (accumulator, currValue) => accumulator + currValue,
    0
    // second argument after the call back function is the initial value of the accumulator
  );
  labelBalance.textContent = `${balance} €`;
};
displayBalance();

// find maximum of array using reduce function
const maxValue = movements.reduce(
  (max, mov) => (mov > max ? mov : max),
  // Number.NEGATIVE_INFINITY
  movements[0]
);
console.log(maxValue);

/* Chaining methods */

// const totalDepositsInUsd = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * eurToUsd)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepositsInUsd);

const calcDisplaySummary = function (movements) {
  const inc = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  const out = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + Math.abs(mov), 0);
  const interest = movements
    .filter(mov => mov > 0)
    .map(mov => mov * 0.012)
    .filter(int => int >= 1)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = `${inc} €`;
  labelSumOut.textContent = `${out} €`;
  labelSumInterest.textContent = `${interest} €`;
};

calcDisplaySummary(movements);
