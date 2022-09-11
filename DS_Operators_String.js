"use strict";

// Data needed for a later exercise
const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

// Data needed for first part of the section
const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
  order: function (starterMenuIdx, mainMenuIdx) {
    return [this.starterMenu[starterMenuIdx], this.mainMenu[mainMenuIdx]];
  },
  /* Destructuring the object in function parameters itself */
  orderDelivery: function ({
    time = "",
    address = "",
    mainIdx = 1,
    starterIdx = 1,
  }) {
    console.log(
      `Your order with ${this.starterMenu[starterIdx]} starter and ${this.mainMenu[mainIdx]} main dish will be delivered to you by ${time} at ${address}`
    );
  },
};

/*
Destructuring of an array
(Introduced in ES6)
*/

const arr = [1, 2, 3];
const [x, y, z] = arr;
console.log(x, y, z); //op : 1 2 3
console.log(arr);

let [main, , secondary] = restaurant.categories;
const [first, second] = restaurant.categories;
console.log(main, secondary); // Op: Italian Vegetarian
console.log(first, second); //OP: Italian Pizzeria

[main, secondary] = [secondary, main]; // this will swap these two variables
// left hand seide represents destructuring of array, right hand side represents construction of an array using two variables.
// this trick can be used to swap two variables in JS in a single line of code.
console.log(main, secondary); //op : Vegetarian Italian

const [starterDish, mainDish] = restaurant.order(2, 1);
console.log(starterDish, mainDish); //op: Garlic Bread Pasta

// nested array destructuring
const nestedArray = [2, 4, [5, 6]];
const [i, , [j, k]] = nestedArray;
console.log(i, j, k); // op : 2 5 6

// default values during destructuring
const [p, q, r] = [8, 9];
console.log(p, q, r); //op: 8 9 undefined
const [s = 1, t = 1, u = 1] = [8, 9];
console.log(s, t, u); // op: 8 9 1

/*
Destructuring of objects
*/

// by directly using the property names
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// by giving alias names
const { name: restaurantName, categories: restaurantCuisineCatg } = restaurant;
console.log(restaurantName, restaurantCuisineCatg);

// default values
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// mutating variables
let a = 111;
let b = 222;
const objDes = { a: 1, b: 2 };
//{a1,b1} = objDes; this will give error. So, try below code
({ a, b } = objDes);
console.log(a, b);

//nested objects

const {
  openingHours: {
    fri: { open: o, close: c },
  },
} = restaurant;

console.log(o, c);

/* Destructuring the object in function parameters itself */
restaurant.orderDelivery({
  time: "23:30",
  address: "19 KP Houston Texas",
  mainIdx: 0,
  starterIdx: 0,
});
restaurant.orderDelivery({
  time: "20:00",
  address: "27 B KP Houston Texas",
  mainIdx: 2,
  starterIdx: 2,
});
