/*
Github Link : https://github.com/jonasschmedtmann/complete-javascript-course
Code Editor : VSCode
Color theme : Monokai Pro
some Settings in VSCode :
            Auto-save : onFocusChange
            multi cursor modifier
            Format on save
            Font size
            word wrap

To open Developer tools on Chrome, use "ctrl + shift + j" or "F12" on windows.


JS Fundamentals --> 
JS is a high-level, object-oriented, multi-paradigm programming language.
Progg. Language : helps us instruct computer to do certain things.
high-level : don't have to worry about complex stuff like memory management.
object-oriented : objects are used to store most kinds of data.
multi-paradigm : flexible to use both imperative/declarative programming styles.

JS helps in adding dynamic effects in web applications in the browser. It can also be used for web-applications on web-server.
Not only web applications, JS is also used for native mobile/desktop applications

JS releases 
ES6/ES2015 --> modern JS
ECMAScript
*/

/*
Values and Variables in JS
*/

let firstName = "Jonas";
/*  variable     value*/
/* variable naming convention 
        1) Camel-case
        2) start with lower-case letter
        3) fully upper-case for constants
   hard-rules
        1) can't start with number
        2) can contain only alphabets, numbers, dollar sign , unserscore
*/
/*
Values --> Object/ Primitive type
Primitive data types :
1) Number
2) String
3) Boolean
4) Undefined : is both type and value.
5) Null : is both type and value.
6) Symbol : Introduced in ES2015. It represents a unique b=value which can't be changed
7) BigInt(ES2020): larger integers than the Number type can hold.

JS has dynamic typing. We don't have to manually define the data type.
*/
let age = 23;
let price = 23.5;
let legalAge = true;
let children;
let numbers = { one: "One", two: "Two" };
numbers = null;
let numberValue = 1;
numberValue = null;
let nullValue = null;
/*
console.log(typeof firstName); // string
console.log(typeof age); // number
console.log(typeof numbers); // object
console.log(typeof children); //undefined
console.log(typeof legalAge); // boolean
console.log(typeof numberValue); // object
console.log(typeof nullValue); // object
*/

age = "Age is just a number";
//console.log(typeof age); // string

/*
let-keyword : introduced in ES6
const-keyword : introduced in ES6
var-keyword
*/

let increasingAge = 30;
increasingAge = 31;

const sameAge = 30;
//sameAge = 31;
//Uncaught TypeError: invalid assignment to const 'sameAge'
//const emptyConstValue;
// 'const' declarations must be initialized.
//SyntaxError: missing = in const declaration

/* basic math operators */
let now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;
// console.log(ageJonas, ageSarah);

// console.log(ageJonas * 2, ageJonas / 10, 2 ** 3);
// 2 ** 3 means 2 to the power of 3

// console.log(firstName + " Schmedtmann");
// console.log(typeof firstName);

//Assignment operators
let x = 10 + 5;
x += 10;
x -= 3;
x *= 4;
x /= 2;
x++;
x--;
// console.log(x);

//Comparison operators
let isOfLegalAge = ageSarah >= 18;
// console.log(ageJonas > ageSarah);
// console.log(ageSarah >= 18);
// console.log(ageJonas < ageSarah);
// console.log(ageSarah <= 18);

/* operator precedence */
// mdn js operator precedence table
// Assignment (right-to-left) < Logical OR (||) < Logical AND (&&) < Inequality < Equality < greater Than < Less Than < Subtraction < Addition < Multiplication/Division < Increment/Decrement

let markHeightInMeters = 1.69;
let johnHeightInMeters = 1.95;
let markWeightInKgs = 78;
let johnWeightInKgs = 92;

let markBMI = markWeightInKgs / markHeightInMeters ** 2;

let johnBMI = johnWeightInKgs / johnHeightInMeters ** 2;

// console.log(markBMI, johnBMI, markBMI > johnBMI);

/* Template Literals */
firstName = "Ankit";
const lastName = "Tripathi";
const job = "Software Developer";
const birthYear = 1993;
now = 2022;

const templateLiteralsExample = `I'm ${firstName + " " + lastName}, a ${
  now - birthYear
} year old ${job}`;

const templateLiteralMultiLine = `multiple
lines
made
easy
with
Template Literals`;

// console.log(templateLiteralsExample);
// console.log(templateLiteralMultiLine);

/* Taking Decisions */
age = 19;
isOfLegalAge = age >= 18;
if (isOfLegalAge) {
  //   console.log("Can drive");
} else {
  //   console.log(`Can't drive, Wait another ${18 - age} years`);
}
let century;
if (birthYear <= 2000) {
  century = 20;
} else {
  century = 21;
}

// console.log(century);

if (markBMI > johnBMI) {
  //   console.log("Mark's BMI is higher");
} else {
  //   console.log("John's BMI is higher");
}

/* Type Conversion and Type Coersion */

//type conversion
const yearAsString = "1993";
// console.log(Number(yearAsString) + 29);
// console.log(Number("Ankit")); // NaN
// console.log(String(123));
// console.log(123);

// type coercion
// console.log("I am " + 29 + " years old");
// console.log("23" - "10" - 3);
// console.log("23" - "10");
// console.log("23" / "10");
// console.log("23" * "10");
// console.log("3" ** "3");
// console.log("1" + 1 - 1); // 10
// console.log(1 + 2 + 3 + 5 + "1"); // 111

/* Truthy and Falsy values 
5 falsy values : 0, '', null, undefined, NaN
*/
// console.log(Boolean(123)); // true
// console.log(Boolean(0)); // false
// console.log(Boolean(null)); // false
// console.log(Boolean(undefined)); // false
// console.log(Boolean("")); // false
// console.log(Boolean(NaN)); // false
// console.log(Boolean([])); // true
// console.log(Boolean({})); // true

const money = 0;
if (money) {
  //   console.log("Save something for future");
} else {
  //   console.log("Earn something for future");
}

/* Equality operators */
age = 18;

// if (age == "18") console.log("You just turned adult! (loose)");
// if (age === "18") console.log("You just turned adult! (strict)"); // '===' doesn't perform type coercion.

// const favourite = Number(prompt("What's your favourite numer?"));
// if (favourite === 23) {
//   alert("Its a great number");
// } else if (favourite === 7) {
//   alert("Its a great number too");
// } else if (favourite) {
//   alert("Cool number " + favourite);
// } else {
//   alert("Not a  number " + favourite);
// }

/* Logical operators */
const hasDriversicense = true;
const hasGoodVision = false;
const isTired = false;
const shouldDrive = hasGoodVision && hasDriversicense && !isTired;

// if (shouldDrive) {
//   console.log("You can Drive");
// } else {
//   console.log("Some one else should Drive");
// }

const averageScoreDolphins = (97 + 112 + 101) / 3;
const averageScoreKoalas = (109 + 95 + 123) / 3;

if (averageScoreDolphins > averageScoreKoalas && averageScoreDolphins >= 100) {
  // console.log("Team Dolphin wins");
} else if (
  averageScoreDolphins < averageScoreKoalas &&
  averageScoreKoalas >= 100
) {
  // console.log("Team Koalas wins");
} else if (
  averageScoreDolphins === averageScoreKoalas &&
  averageScoreDolphins >= 100 &&
  averageScoreKoalas >= 100
) {
  // console.log("Draw");
} else {
  // console.log("No one wins the trophy");
}

/* switch Statement */

const day = "monday";

switch (day) {
  case "monday":
    // console.log("Plan course structure");
    break;
  case "tuesday":
    // console.log("Prepare theory videos");
    break;
  case "wednesday":
  case "thursday":
    // console.log("Write Code examples");
    break;
  case "friday":
    // console.log("record videos");
    break;
  case "saturday":
  case "sunday":
    // console.log("Enjoy the weekend");
    break;
  default:
  // console.log("invalid day");/
}

/* expressions and  statements 
expression : produces some value. (ex : 3+4, 1991, true && false & !false)
statement : bigger piece of code. Doesn't produce value. They are instructions to the computer. (ex: if-else statement, switch statement).
*/

/* Conditional operator (Ternary operator) */

age = 29;
const hobby = age >= 18 ? "Drive" : "Travel";
// console.log(`I like to ${hobby}`);

const billValue = 430;
const tip =
  billValue < 300 && billValue > 50 ? billValue * 0.15 : billValue * 0.2;
// console.log(
//   `The bill was ${billValue}, the tip was ${tip}, and the total value ${
//     billValue + tip
//   }`
// );
