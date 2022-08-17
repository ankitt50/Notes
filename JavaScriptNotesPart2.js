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

/* Function calling other functions */
const calcRetirementTimeLeft = (birthYear, retirementAge) => {
  const currentAge = calcAge(birthYear);
  return retirementAge - currentAge;
  /* Any statement after the 'return' statement (inside the fn.) is not executed!! */
};
// console.log(calcRetirementTimeLeft(1993, 65));

/* Arrays in JS */
const friends = ["Ankit", "Saksham", "Vikrant", "Arun"];
const years = new Array(1991, 1984, 2008, 2020);

/* Square bracket syntax to fetch Array elements */
// console.log(friends[0]);
// console.log(friends[3]);
// console.log(years[0]);

// console.log(friends.length);
// console.log(years.length);
// console.log(friends[friends.length - 1]);
// console.log(years[years.length - 1]);

friends[0] = "Mishra";
/* Although the friends array was defined as a 'const', but still we can mutate it. Because its not primitive type. */
// console.log(friends);

/* But we can't re-assign an entirely new array */
// friends = ["Mishra", "Sharad", "Vikrant", "Arun"];
//Uncaught TypeError: invalid assignment to const 'friends'
const year = 1993;
const arrayWithExpressionsAndVariables = [year, 1998, 2037 - 1993];
// console.log(arrayWithExpressionsAndVariables);

/* Basic Array operations */
const newLengthOfArray = friends.push("Nikhil"); /* push to the end of array */
years.push(1885);
// console.log(friends);
// console.log(years);
// console.log(newLengthOfArray);

friends.unshift("Aditya"); /* push to the start of array */
// console.log(friends);

const poppedElement =
  friends.pop(); /* removes the last element and return it */
// console.log(friends);
// console.log(poppedElement);

friends.shift(); /* removes the first element and return it */
// console.log(friends);

const firstOccurence =
  friends.indexOf(
    "Arun"
  ); /* Returns the index of the first occurrence of a value in an array, or -1 if it is not present. */
// console.log(firstOccurence);

const foundElement =
  friends.includes(
    "Arun"
  ); /* Determines whether an array includes a certain element, returning true or false as appropriate. */
// console.log(foundElement);

/* Objects in JS */
const ankit = {
  firstName: "Ankit",
  lastName: "Tripathi",
  age: 2037 - 1993,
  job: "Software Developer",
  friends: friends,
};
// console.log(ankit);

/* dot notation */
// console.log(ankit.friends);
// console.log(ankit.age);
ankit.location = "Agra, UP, India";
// console.log(ankit.location);

/* square braket : inside square braket we can write expressions */
// console.log(ankit["age"]);
const jobKey = "job";
// console.log(ankit[jobKey]);
ankit["techstack"] = "Java, JS, ReactJS, Springboot";
// console.log(ankit["techstack"]);

/* Object methods */
ankit.getWater = function (glasses) {
  // console.log(`${this.firstName} Fetching ${glasses} glasses of water`);
};

ankit.getWater(4);
ankit["getWater"](5);

const saksham = {
  firstName: "Saksham",
  lastName: "Tripathi",
  birthYear: 1998,
  job: "Software Developer",
  friends: friends,
  // calcAge: function () {
  //   return 2037 - this.birthYear;
  // },
  calcAge: function () {
    this.age = 2037 - this.birthYear;
    return this.age;
  },
  getSummary: function () {
    return `${
      this.firstName + " " + this.lastName
    } is a ${this.calcAge()} years old ${this.job}`;
  },
};

// console.log(saksham.calcAge());
// saksham.calcAge();
// console.log(saksham.age);
// console.log(saksham.getSummary());

/* Loops in JS */

/* for-Loop*/

for (let i = 1; i <= 10; i++) {
  // console.log(`iteration number : ${i}`);
}
ankit.friends.unshift("");
ankit.friends.unshift(undefined);
for (let i = 0; i < ankit.friends.length; i++) {
  if (!ankit.friends[i]) {
    continue;
    /*continue to escape the current iteration and move to the next iteration */
  }
  // console.log(ankit.friends[i]);
  if (ankit.friends[i] === "Arun") {
    // console.log("Arun found!");
    break;
    /*break is to completely terminate the loop.*/
  }
}

/* loop inside loop */
for (let i = 1; i < 3; i++) {
  for (let j = 1; j < 3; j++) {
    // console.log(i, j);
  }
}

/* while loop */
let rep = 1;
while (rep <= 10) {
  // console.log(rep);
  rep++;
}

/* 
let dice = Math.trunc(Math.random() * 6) + 1;
while (dice !== 6) {
  // console.log(dice);
  dice = Math.trunc(Math.random() * 6) + 1;
}
*/
