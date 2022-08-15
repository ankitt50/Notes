/* Strict mode 
has to be the very first statement in the file.
Forbids certain things, also gives visible errors in the console. */
"use strict";
let hasDriversicense = false;
let passTest = true;
// if (passTest) hasDrivericense = true;
/* We are assigning the value to a new variable, as there is a spelling mistake here. In normal mode there will be no error shown in console. */

// if (hasDriversicense) console.log("I can drive");

/* Functions
DRY (Don't repeat yourself)
functions are reusable piece of code, and helps in maintaining the principle of DRY.
*/

function logger(info) {
  /* "info" here is parameter to the function */

  //   console.log("Logger function");

  //   console.log(`Method name : ${info.method}
  //   Line Number : ${info.line}
  //   message : ${info.message}`);

  return `Method name : ${info.method}
  Line Number : ${info.line}
  message : ${info.message}`;
}

// calling or invoking function
const logInfo = logger({
  method: "Logger fn",
  line: "22",
  message: "Logging info",
});
/* When actually calling the function, the actual values that we provide for the parameters are called arguments. */

// console.log(logInfo);

/* Function declaration and expression */

/* function declaration : we can call them above the line of code where we have defined it.*/
const age1 = calcAge(1993);
function calcAge(birthYear) {
  return 2037 - birthYear;
}

/* function expression */
const calcAgeFnExpression = function (birthYear) {
  return 2037 - birthYear;
};
const age2 = calcAgeFnExpression(1993);

/* Arrow Function : they don't get the 'this'-keyword*/
const calcAgeArrowFn = (birthYear) => 2037 - birthYear;
const age3 = calcAgeArrowFn(1993);

const calcRetirementAgeArrowFn = (birthYear, retirementAge) => {
  const currentAge = 2037 - birthYear;
  return retirementAge - currentAge;
};
const retirementAge1 = calcRetirementAgeArrowFn(1993, 65);

// console.log(age1, age2, age3, retirementAge1);