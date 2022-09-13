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

/* Spread operator (ES6) 
1) gives us all the elements of the array. Unlike destruturing where we can pick the elements we want.
2) doesn't create new variables. During destructuring , we do get new variables.
3) It works on all iterables (array, string, map, set). But can be used if the final result is an array, or when passing it to another function. ex: it will not work if passed during template literal string creation.
*/
const newArr = [4, 5, ...arr];
console.log(arr); //op: [1, 2, 3]
console.log(newArr); //op : [ 4, 5, 1, 2, 3 ]
console.log(...newArr); // op : 4, 5, 1, 2, 3

const newMainMenu = [...restaurant.mainMenu, "Gnocci"];
console.log(newMainMenu);

// copy arrray (shallow copy)
const newCopiedArr = [...newArr];
console.log(newCopiedArr); //op: [ 4, 5, 1, 2, 3 ]

// Join 2 arrays or more
const joinedArr = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(joinedArr); // op: [ "Pizza", "Pasta", "Risotto", "Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad" ]

// spread operator with Objects. ex: creating a copy of another object
const newRestaurant = { ...restaurant };
const newRestaurant1 = { foundedIn: 1999, ...restaurant, founder: "Ankit" };
console.log(newRestaurant);
console.log(newRestaurant1);
newRestaurant.name = "new Name";
console.log(newRestaurant.name); // op: new Name
console.log(restaurant.name); //op: Classico Italiano

/*Rest pattern and  parameter */
const [d, e, ...others] = newArr;
console.log(d, e); // op: 4 5
console.log(others); // op : [1,2,3]

// the rest pattern must always be the last element.
const [pizza, , risotto, ...otherFoodItems] = joinedArr;
console.log(pizza, risotto); //op : Pizza Risotto
console.log(otherFoodItems); // op :[ "Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad" ]

// works for objects as well
const { name: name1, ...restPropeties } = restaurant;
console.log(name1);
console.log(restPropeties);

// parameters in a  function
const addNumber = function (...numbers) {
  let sum = 0;
  // numbers is an array, due to usage of rest pattern.
  numbers.forEach((element) => {
    sum += element;
  });
  return sum;
};

console.log(addNumber(2, 3, 5, 7)); //op : 17
console.log(addNumber(...newArr)); // here the arguments are picked using spread operator, and not rest pattern.

/*
Short circuiting (&&, ||)
Can use any data type, return any data type.
*/
console.log(3 || "Jonas");
console.log("" || "Jonas");
console.log(true || 0);
console.log(undefined || null);
console.log(null || undefined);

restaurant.numGuests = 23;
// const guests = restaurant.numGuests
//   ? restaurant.numGuests
//   : "restaurant guests count not defined";
let guests = restaurant.numGuests || "restaurant guests count not defined";
console.log(guests);

console.log(3 && "Jonas");
console.log("" && "Jonas");
console.log(true && 0);
console.log(undefined && null);
console.log(null && undefined);

// if (restaurant.orderDelivery) {
//   restaurant.orderDelivery("14:00", "27B KP", 1, 0);
// }
restaurant.orderDelivery &&
  restaurant.orderDelivery({
    time: "14:00",
    address: "27B KP",
    starterIdx: 1,
    mainIdx: 0,
  });

/*
Nullish coalescing operator (ES6) ??
works with the idea of nullish values and not falsy values.
*/
restaurant.numGuests = 0;
guests = restaurant.numGuests || "restaurant guests count not defined";
console.log(guests); // op: restaurant guests count not defined
const correctGuests =
  restaurant.numGuests ?? "restaurant guests count not defined";
console.log(correctGuests); // op : 0

/*
Logical assignment operator
*/
restaurant.numGuests = 0;
// restaurant.numGuests = restaurant.numGuests || 23;
restaurant.numGuests ||= 23; // OR assignment operator
console.log(restaurant.numGuests);
restaurant.numGuests &&= 100; // AND assignment operator
console.log(restaurant.numGuests);

restaurant.numGuests = 23;
// restaurant.numGuests = restaurant.numGuests || 23;
restaurant.numGuests ||= 0; // OR assignment operators
console.log(restaurant.numGuests);
restaurant.numGuests &&= 0; // AND assignment operator
console.log(restaurant.numGuests);

restaurant.numGuests = 0;
// restaurant.numGuests = restaurant.numGuests || 23;
restaurant.numGuests ??= 23; // nullish coalescing assignment operators
console.log(restaurant.numGuests);
