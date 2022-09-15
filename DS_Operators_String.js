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

/*
Looping Arrays (for-of loop)
*/

for (const item of joinedArr) console.log(item);

for (const [idx, item] of joinedArr.entries()) {
  console.log(`${idx} : ${item}`);
}

/*
Enhanced Object Literals (ES6)
*/
const address = "19 KP Houston TX";
// const restaurant2 = {
//   name: "Punjabi Tadka",
//   address: address,
// };
const [day1, day2, day3] = ["monday", "wednessday", "friday"];
let restaurant2 = {
  name: "Punjabi Tadka",
  // ES6 enhanced object literals
  address,
  // printHello: function (custName) {
  //   console.log(`Hello ${custName} from Punjabi tadka`);
  // },

  // ES6 enhanced object literals (functions)
  printHello(custName) {
    console.log(`Hello ${custName} from Punjabi tadka`);
  },

  // ES6 enhanced object literals (keys/properties)
  [day1]: "Dal Tadka", // monday: "Dal Tadka",
  [day2]: "Rajma", // wednessday: "Rajma",
  [day3]: "Chole Bhature",
};
// console.log(restaurant2);
console.log(restaurant2);
restaurant2.printHello("Ankit");

/*
optional chaining (?)
works on the concept of nullish values and not falsy values.
*/
const nullVariable = null;
//console.log(restaurant2.openingHours.mon); //TypeError: restaurant2.openingHours is undefined
console.log(restaurant2.openingHours?.mon); // undefined
console.log(restaurant2.openingHours?.mon?.open); // undefined
console.log(nullVariable?.somevariable); // undefined
// can be used for methods as well
restaurant2.printHello?.("Ankit");
console.log(nullVariable?.someMethod?.()); // op: undefined
// can be used for Arrays
console.log(joinedArr[100]?.includes("Ankit")); // op: undefined

/*
Looping objects (Keys, Values and Entries)
*/

for (const day of Object.keys(openingHours)) {
  console.log(day);
}

for (const { open, close } of Object.values(openingHours)) {
  console.log(open, close);
}

for (const [day, { open, close }] of Object.entries(openingHours)) {
  console.log(day, open, close);
}

/*
Sets (ES6)
unique values, can't have duplicates
there are no key-value pairs.
there is no indexing as well.
they are iterables, so we can loop over them.
*/

const orderedSet = new Set([
  "Pizza",
  "Pasta",
  "Pizza",
  "Pizza",
  "Pasta",
  "Pasta",
  "Rissoto",
]);

console.log(new Set("Ankit")); // [ "A", "n", "k", "i", "t" ]

console.log(orderedSet); // [ "Pizza", "Pasta", "Rissoto" ]

console.log(orderedSet.size); // 3
console.log(orderedSet.has("Pizza")); // true
console.log(orderedSet.has("Bread")); // false

orderedSet.add("Garlic Bread");
orderedSet.delete("Rissoto");
console.log(orderedSet); // [ "Pizza", "Pasta", "Garlic Bread" ]

// orderedSet.clear();
// console.log(orderedSet); // []

for (const order of orderedSet) console.log(order);

// creating an array of unique elements
const staff = [
  "waiter",
  "chef",
  "manager",
  "chef",
  "waiter",
  "manager",
  "manager",
  "waiter",
];
const uniqueStaff = [...new Set(staff)];
console.log(uniqueStaff); // Array(3) [ "waiter", "chef", "manager" ]

/*
Maps(ES6)
key-value pairs
Unlike objects, in maps keys can be of any type
*/

restaurant2 = new Map();
restaurant2.set(1, "19 KP");
restaurant2.set(2, "27B KP");
restaurant2
  .set("menu", ["roti", "sabzi", "daal", "chawal"])
  .set("name", "dhabaa");
console.log(restaurant2); //Map(4) { 1 → "19 KP", 2 → "27B KP", menu → (4) […], name → "dhabaa" }

console.log(restaurant2.get("1")); //undefined
console.log(restaurant2.get(1)); // 19 KP
console.log(restaurant2.has("order")); // false
restaurant2.delete("menu");
console.log(restaurant2); // Map(3) { 1 → "19 KP", 2 → "27B KP", name → "dhabaa" }
console.log(restaurant2.size); // 3
restaurant2.clear();
console.log(restaurant2); // Map(0)

// convert object to map
// Map is kind of array of arrays, so we can just use object.entries() method to create
// a map.

const mapFromObject = new Map(Object.entries(openingHours));
console.log(mapFromObject); // Map(3) { thu → {…}, fri → {…}, sat → {…} }
const mapFromArrayOfArrays = new Map([
  ["question", "What is your name?"],
  ["answer", "Ankit"],
  ["question2", "What is your brother's name?"],
  ["answer2", "Saksham"],
]);
console.log(mapFromArrayOfArrays); // Map(4) { question → "What is your name?", answer → "Ankit", question2 → "What is your name?", answer2 → "Saksham" }

// Maps are iterables, so we can loop over them using for-of loop
for (const [key, value] of mapFromArrayOfArrays) {
  console.log(
    key.includes("question") ? `Question : ${value}` : `Answer : ${value}`
  );
}
