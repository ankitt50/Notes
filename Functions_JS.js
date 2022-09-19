"use strict";

const bookings = [];

/* Default parameters */
const createBooking = function (
  flightNum,
  NumPassengers = 1,
  price = 200 * NumPassengers
) {
  const booking = {
    flightNum,
    NumPassengers,
    price,
  };
  bookings.push(booking);
  console.log(booking);
};

createBooking("A230");
createBooking("A320", undefined, 300); // we can't skip middle parameters. So, just give it a value of undefined.
createBooking("A320", 3);

/* Reference vs. value type arguments 
JS doesn't allow pass-by-reference. Although we may pass memory address value as argument when argument is Object type. But still it's not pass-by-reference.
*/

const flight = "A320";
const passenger = {
  name: "Ankit Tripathi",
  passportNumber: "234567987101112",
};
const checkIn = function (flightNum, passengerInfo) {
  flightNum = "F123";
  passengerInfo.passportNumber = "123456789101112";
};
checkIn(flight, passenger);
console.log(flight); // A320
console.log(passenger); // { name: "Ankit Tripathi", passportNumber: "123456789101112" }

/* first class functions and Higher order functions 

Higher Order functions are functions that either return another function or take another function as an argument or both. This is possible, becaus functions are first class in JS.
First class functions means, that they are just another value (Object).
ex: addEventListener
*/

const oneWord = function (str) {
  return str.replace(/ /g, "");
};

const firstWordUpperCase = function (str) {
  const [firstWord, ...others] = str.split(" ");
  return [firstWord.toUpperCase(), ...others].join(" ");
};

//Higher Order Function
const transformerFn = function (str, func) {
  console.log(`Original String : ${str}`);
  console.log(`Transformed String : ${func(str)}`);
  console.log(`Transformed by : ${func.name}`);
};

transformerFn("JavaScript is best language in the world!", firstWordUpperCase);
transformerFn("Ankit Tripathi", oneWord);

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greet2ArrowFn = (greeting) => (name) =>
  console.log(`${greeting} ${name}`);

const greetHey = greet("Hey");
greetHey("Ankit"); // Hey Ankit

const greetHello = greet2ArrowFn("Hello");
greetHello("Ankit"); // Hello Ankit

/* call, apply and bind methods */

const lufthansa = {
  name: "Lufthansa",
  iataCode: "LH",
  bookings: [],
  book(flightNum, psName) {
    console.log(
      `Ticket booked with ${this.name} Airlines on ${this.iataCode}${flightNum} for ${psName}`
    );
    this.bookings.push(
      `Ticket booked with ${this.name} Airlines on ${this.iataCode}${flightNum} for ${psName}`
    );
  },
};
lufthansa.book("737", "Ankit");
lufthansa.book("320", "Saksham");
console.log(lufthansa.bookings);

const euroWings = {
  name: "EuroWings",
  iataCode: "EW",
  bookings: [],
};

const commonBookingService = lufthansa.book;
//commonBookingService("320", "Saksham"); // this is undefined.

// first argument to call method represents what 'this' keyword should point to
commonBookingService.call(lufthansa, "320", "Saksham"); // Ticket booked with Lufthansa Airlines on LH320 for Saksham
commonBookingService.call(euroWings, "737", "Ankit"); // Ticket booked with EuroWings Airlines on EW737 for Ankit

commonBookingService.apply(lufthansa, ["320", "Saksham"]); // apply method works similar to call method. But takes arguments as an array.
commonBookingService.apply(euroWings, ["737", "Ankit"]);

// bind method: it doesn't immediately invoke the function, but returns a function that can be later used with the this keyword defined.

const bookServiceEw = lufthansa.book.bind(euroWings);
const bookServiceLf = lufthansa.book.bind(lufthansa);
const bookServiceEw23 = lufthansa.book.bind(euroWings, "23");

bookServiceEw("320", "Saksham");
bookServiceLf("737", "Ankit");
bookServiceEw23("Mr. Dherya Sharma");
// console.log(euroWings.bookings);

/* IIFE  (immediately Invoked Function Expressions)
Function that is executed right away, and is executed only once.
IIFE provides data privacy and data encapsulation.
*/

(function () {
  console.log("This will not be called again");
})();

(() => console.log("This will also not be called again"))();

/* Closures 
Every function will always have access to the variable environment of the execution context in which it was created. Even if the execution context itself is destroyed, the variable environment will still be accessible for the function.
Closures are given priority over the scope chain.
*/

const secureBooking = function () {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

booker();
booker();
booker(); // 3 passengers

let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const a = 777;
  f = function () {
    console.log(a * 2);
  };
};

g();
f(); // 46

// re-assigning f variable
// As variable is re-assigned, a new closure is created and old one is removed.
h();
f(); // 1554

const boardPassengers = function (n, wait) {
  const perGroup = n / 3;
  // call back function is called totally independent of the boardPassengers function. But still it has access to all the variables due to closures.
  setTimeout(() => {
    console.log(`We have started boarding ${n} passengers`);
    console.log(`There are 3 group with ${perGroup} passengers in each group.`);
  }, wait * 1000);
  console.log(`Will start boarding in ${wait} seconds`);
};

boardPassengers(180, 3);
