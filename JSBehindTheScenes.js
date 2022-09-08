/*
JS: high level, prototype based, OOP, multi-paradigm, interpreted / JIT compliled,
    dynamic, single-threaded, garbage-collected.

    first-class fns,
    non-blocking event loop concurrency model


    JS Engine (ex:v8 used by Chrome and nodejs) : program that executes JS code.
    JS Engine's components : Call Stack, and Heap.
                             Call stack is where the code is executed. It consists of execution contexts.
                             Heap is where objects needed by our program are stored (unstructured memory).

    Compilation : entire source code converted to m/c code at once and written to binar file.

                    source code ---Compilation---> m/c code ---Execution---> program running

                    ** execution can happen way after compilation.
    
    Interpretation : interpretor runs through the source code line-by-line and executes it.
                     FYI, code still needs to be converted to m/c code.

    JIT Compilation : Entire code is converted to m/c code at once and executed immediately 
                      (instead of writing the m/c code in a portable file.)
                      Modern JS uses JIT, but earlier it used interpretation.

    Steps of JIT compilation followed in JS engines :
        Parsing (converted into tree/Abstract Syntax Trees(AST))
                
                |
                |
                |
                V
                
        Compilation (AST converted to m/c code) <-------------------
                                                                    |                         
                |                                                   |
                |                                                   |
                |                                                optimisation (happens along
                |                                                    with execution)
                V                                                   |
                                                                    |
        Execution (happens in call stack) ------------------------->

            ** All these steps use separate special threads that we can't access in out code.

    
    JS runtime (ex: browsers) : contains everything required to use JS.
                                ex: JS engine, Web APis, call back queue.

    Execution context : environment in which we execute JS code. It stores all the info     required for execution.
    There's always one single Global/top-level execution context.
    But for every function a separate execution context is created. All these execution contexts together create a call stack.
    Execution context consists of variable environment (let/const/var variables, functions, arguments object), scope chain, this-keyword.
    ** for execution context created for arrow functions don't have arguments object and this-keyword.

    Compilation --> creation and execution of Global execution Context (anything outside functions) --> execution of functions and waiting for callbacks


    scopes in JS : global scope, function scope, block scope(ES6).
                   only let/const variables are block scoped. 
                   in strict mode functions are also block scoped.

    ** All the scopes have access to variables from outer scopes (called variable look up in scope chain)
*/

"use strict";

function calAge(birthYear) {
  console.log(firstName);
  const age = 2022 - birthYear;
  console.log(`Hi ${firstName}, you are ${age} years old`);
  function printAgeMsg() {
    const lastName = "Tripathi";
    console.log(`Hi ${firstName + " " + lastName}, you are ${age} years old`);

    if (birthYear > 1986 && birthYear <= 1993) {
      var str2 = "var is not block scoped";
      const str = "Congrats you are a millenial";
      console.log(str);
      const firstName = "Not Ankit";
      /* 
      In below line, firstName variable defined in this if-block will be used instead of the 'firstName' defined  outside*/
      console.log(`Hi ${firstName + " " + lastName}, you are ${age} years old`);
      function tempTestFn() {
        console.log("Functions are block scoped in strict mode after ES6");
      }
    }
    console.log(str2); // this will work fine. bcoz var is not block scoped.
    // tempTestFn(); this will give error.
  }
  printAgeMsg();
  // console.log(str2); this will give error.
}

const firstName = "Ankit";
calAge(1993);

/*
Hoisting : some variables are accessible before they are declared in the code. Behind the scenes, the code is scanned before execution, and for each variable, a new property is create in the variable Environment object.
                                   Hoisted                    Initial Value              Scope
function declarations               Yes                       actual function            block
'var' variables                     Yes                       undefined                  function
'let' and 'const' variables         No ("technically" yes)    <uninitialized>,TDZ        block
function expressions and arrows     depends on 'var' or 'const'/'let' declaration usage                     

**TDZ : Temporal Dead Zone.
In TDZ, error is "Can't access before initialization". Otherwise error is "not defined".
*/

console.log(me); //o/p : undefined
// console.log(job); // Uncaught ReferenceError: can't access lexical declaration 'job' before initialization
// console.log(year); Uncaught ReferenceError: can't access lexical declaration 'year' before initialization

var me = "Ankit";
let job = "SD";
const year = 1993;

console.log(sum(1, 2)); // O/p : 3
// console.log(sum1(1, 2)); Uncaught ReferenceError: can't access lexical declaration 'sum1' before initialization
// console.log(sum2(1, 2)); Uncaught ReferenceError: can't access lexical declaration 'sum2' before initialization
console.log(sum3); // undefined
//console.log(sum3(1, 2)); // Uncaught TypeError: sum3 is not a function

function sum(a, b) {
  return a + b;
}

const sum1 = function (a, b) {
  return a + b;
};

const sum2 = (a, b) => a + b;

var sum3 = (a, b) => a + b;

var x = 1;

console.log(x === window.x); // var - keyword creates a global property in window object.

/* 
this - keyword : special variable created for every execution context (function). takes the value of the owner of the function. the value defined only when fn. is called.
1) Method - this keyword refers to the object that is calling it.
2) Simple function call - this keyword is undefined in strict mode. otherwise, it will be window object.
3) Arrow functions - don't get their own this keyword. refers to the surrounding function's/scope's this-keyword
4) event listener - DOM element that listener is attached to.
*/

console.log(this); // In global scope it refers to the window object.

const calAge2 = function (birthYear) {
  console.log(this); // 'this' is undefined
  return 2022 - birthYear;
};

const calAge3 = (birthYear) => {
  console.log(this); // 'this' will represent window object
  return 2022 - birthYear;
};

calAge3(1993);
calAge2(1993);

const objectWithMethod = {
  birthYear: 1993,
  calAge: function () {
    console.log(this); //'this' will refer to the object which is calling the method.
    return 2022 - this.birthYear;
  },
  calAge2: () => {
    console.log(this); // 'this' will refer to the window object
  },
};

objectWithMethod.calAge();
objectWithMethod.calAge2();

const objectWithOutMethod = {
  birthYear: 1998,
};

objectWithOutMethod.calAge = objectWithMethod.calAge;
const fnWithoutObject = objectWithMethod.calAge;
console.log(objectWithOutMethod.calAge());
// console.log(fnWithoutObject()); // error : 'this' is undefined.
