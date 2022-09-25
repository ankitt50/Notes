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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  // console.log(sort, movs);
  movs.forEach(function (movement, idx) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
<div class="movements__type movements__type--${type}">${idx + 1} ${type}</div>
<div class="movements__value">${Math.abs(movement)} €</div>
</div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// displayMovements(account1.movements);

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

const displayBalance = function (acc) {
  const balance = acc.movements.reduce(
    (accumulator, currValue) => accumulator + currValue,
    0
    // second argument after the call back function is the initial value of the accumulator
  );
  acc.balance = balance;
  labelBalance.textContent = `${acc.balance} €`;
};
// displayBalance();

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

const calcDisplaySummary = function (movements, interestRate) {
  const inc = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  const out = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + Math.abs(mov), 0);
  const interest = movements
    .filter(mov => mov > 0)
    .map(mov => mov * interestRate)
    .filter(int => int >= 1)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = `${inc} €`;
  labelSumOut.textContent = `${out} €`;
  labelSumInterest.textContent = `${interest} €`;
};

// calcDisplaySummary(movements);

/* Find method 
returns the first element in the array that satisfies the condition
*/
//console.log(movements); // [ 200, 450, -400, 3000, -650, -130, 70, 1300 ]
//console.log(movements.find(mov => mov < 0)); // -400

// console.log(accounts);
// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account); // { owner: "Jessica Davis", movements: (8) […], interestRate: 1.5, pin: 2222, userName: "jd" }
let currAccount;
/* Login button event listener */
btnLogin.addEventListener('click', function (event) {
  event.preventDefault();
  /*
  console.log('login');
  console.log(inputLoginUsername.value);
  console.log(inputLoginPin.value);
  */

  currAccount = accounts.find(acc => acc.userName === inputLoginUsername.value);
  // console.log(account);

  if (currAccount?.pin === Number(inputLoginPin.value)) {
    /*if (account && account.pin === Number(inputLoginPin.value)) {*/
    containerApp.style.opacity = 1;
    calcDisplaySummary(currAccount.movements, currAccount.interestRate);
    displayBalance(currAccount);
    displayMovements(currAccount.movements);
    // document.querySelector('nav').style.display = 'none';
    document.querySelector('.login').style.display = 'none';
    labelWelcome.textContent = `Welcome back, ${
      currAccount.owner.split(' ')[0]
    }`;
  }
});

btnTransfer.addEventListener('click', function (event) {
  event.preventDefault();
  // console.log(inputTransferAmount.value);
  // console.log('tranferred');
  // console.log(inputTransferTo.value);
  const othrAccount = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );
  // console.log(othrAccount);
  if (
    othrAccount &&
    Number(inputTransferAmount.value) > 0 &&
    currAccount.balance > Number(inputTransferAmount.value) &&
    currAccount.userName !== othrAccount.userName
  ) {
    othrAccount.movements.push(Math.abs(Number(inputTransferAmount.value)));
    currAccount.movements.push(
      Math.abs(Number(inputTransferAmount.value)) * -1
    );
    calcDisplaySummary(currAccount.movements, currAccount.interestRate);
    displayBalance(currAccount);
    displayMovements(currAccount.movements);
  }
  inputTransferTo.value = '';
  inputTransferAmount.value = '';
  inputTransferAmount.blur();
  inputTransferTo.blur();
});

/* findIndex method in JS */

btnClose.addEventListener('click', function (event) {
  event.preventDefault();
  // console.log('Close Account');
  // console.log(inputCloseUsername.value,currAccount.userName);
  // console.log(currAccount.pin,inputClosePin.value);
  if (
    currAccount.userName === inputCloseUsername.value &&
    currAccount.pin === Number(inputClosePin.value)
  ) {
    const accIdx = accounts.findIndex(
      acc => acc.userName === currAccount.userName
    );
    accounts.splice(accIdx, 1);
    containerApp.style.opacity = 0;
    document.querySelector('.login').style.display = 'flex';
  }
  inputCloseUsername.value = '';
  inputClosePin.value = '';
});

/*some and every */

// include method checks for equality with any element in the array.
/*
console.log(movements); //[ 200, 450, -400, 3000, -650, -130, 70, 1300 ]
console.log(movements.includes(-150)); // false
console.log(movements.includes(-130)); // true
*/

// some method checks for a condition
/*
console.log(movements); // [ 200, 450, -400, 3000, -650, -130, 70, 1300 ]
console.log(`Are their any deposits : ${movements.some(mov => mov > 0)}`); // true
console.log(
  `Are their any deposits more than 1500 : ${movements.some(mov => mov > 1500)}`
); // true
*/

// every method checks for condition , and should be true for all the elements in the array
/*
console.log(movements); // [ 200, 450, -400, 3000, -650, -130, 70, 1300 ]
console.log(
  `Are all the movements deposits : ${movements.every(mov => mov > 0)}`
); // false
console.log(
  `Are all the movements deposits : ${accounts[3].movements.every(
    mov => mov > 0
  )}`
); // true
*/

/* Loan functionality for the app
Condition : atleast one deposit with amount greater than 10% of the requested amount.
*/
btnLoan.addEventListener('click', function (event) {
  event.preventDefault();
  // console.log(inputLoanAmount.value);
  const isEligibleForLoan = currAccount.movements.some(
    mov => mov >= Number(inputLoanAmount.value) * 0.1
  );
  if (Number(inputLoanAmount.value) > 0 && isEligibleForLoan) {
    // console.log('Loan granted');
    currAccount.movements.push(Number(inputLoanAmount.value));
    calcDisplaySummary(currAccount.movements, currAccount.interestRate);
    displayBalance(currAccount);
    displayMovements(currAccount.movements);
  }
});

/* flat and flatMap methods */
/*
let arr = [[1, 2, 3], [4, 5, 6], 7, 8, 9];
let newFlatArr = arr.flat();
// console.log(newFlatArr); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

arr = [
  [1, 2, 3],
  [4, 5, 6],
  7,
  8,
  9,
  [
    [10, 11, 12, 13],
    [14, 15, 16],
  ],
];
// by default, flat method goes only one level deep.
newFlatArr = arr.flat();
console.log(newFlatArr); //  [ 1, 2, 3, 4, 5, 6, 7, 8, 9, [ 10, 11, 12, … ], [ 14, 15, 16 ]]
newFlatArr = arr.flat(2);
console.log(newFlatArr); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
*/

//const accountMovements = accounts.map(acc => acc.movements);
//console.log(accountMovements); // Array of arrays : [ (8) […], (8) […], (8) […], (5) […] ]
//console.log(accountMovements.flat()); // [ 200, 450, -400, 3000, -650, -130, 70, 1300, 5000, 3400, … ]
let allMovementsBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov);
// console.log(allMovementsBalance); // 17840

//flatMap method conbines a map and flat method.
// It only goes one level deep and we can't change it.
allMovementsBalance = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov);
// console.log(allMovementsBalance); // 17840

/* Sorting arrays */

/*
const owners = ['Zack', 'Martha', 'Jonas', 'Adam'];
console.log(owners.sort()); // [ "Adam", "Jonas", "Martha", "Zack" ]
// the original array itself is mutated.
console.log(owners); // [ "Adam", "Jonas", "Martha", "Zack" ]

console.log(movements); // [ 200, 450, -400, 3000, -650, -130, 70, 1300 ]
// below sorting looks weird!! That's bcoz, the by default sorting order is based on string.
console.log(movements.sort()); // [ -130, -400, -650, 1300, 200, 3000, 450, 70 ]
// this below one is correct
console.log(movements.sort((a, b) => a - b)); // [ -650, -400, -130, 70, 200, 450, 1300, 3000 ]
*/
let areMovementsSorted = false;
btnSort.addEventListener('click', function (event) {
  event.preventDefault();
  // console.log(
  //   `current Account movements : ${
  //     currAccount.movements
  //   }, should we sort the movements : ${!areMovementsSorted}`
  // );
  displayMovements(currAccount.movements, !areMovementsSorted);
  areMovementsSorted = !areMovementsSorted;
});

/* creating Arrays */
//console.log([1, 2, 3, 4, 5]);
//console.log(new Array(1, 2, 3, 4, 5)); // [ 1, 2, 3, 4, 5 ]

const xArr = new Array(7); // it will not create an array with '7' as the only element.
//console.log(xArr); // [ <7 empty slots> ]
// the only method that we can call on this empty array to fill it is 'fill' method

/*
xArr.fill(1);
console.log(xArr); // [ 1, 1, 1, 1, 1, 1, 1 ]
*/

/*
xArr.fill(1, 3);
console.log(xArr); // [ <3 empty slots>, 1, 1, 1, 1 ]
*/

xArr.fill(1, 3, 5);
// console.log(xArr); //[ <3 empty slots>, 1, 1, <2 empty slots> ]

// fill() method can be used on already filled arrays as well.
xArr.fill(1);
xArr.fill(2, 1, 2);
xArr.fill(3, 2, 3);
xArr.fill(4, 3);
// console.log(xArr); // [ 1, 2, 3, 4, 4, 4, 4 ]

// Array from
/*
// const yArr = Array.from({ length: 7 }, () => 1);
// console.log(yArr); // [ 1, 1, 1, 1, 1, 1, 1 ]
*/
/*
const yArr = Array.from({ length: 7 }, (_ , idx) => idx + 1);
console.log(yArr); //[ 1, 2, 3, 4, 5, 6, 7 ]
*/

const movementFromUI = Array.from(
  document.querySelectorAll('.movements__value'),
  el => Number(el.textContent.replace('€', ''))
);
console.log(movementFromUI); // [ 4000, -378 ]

// document.querySelector doesn't return an array, but a list. So, we can't use the array methods
// directly with it. So, we can convert the iterable list to Array using Array.from() and then use the array methods on it.

// Alternative way would be to use spread operator.
