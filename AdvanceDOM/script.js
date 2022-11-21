'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/* DOM 
allows JS to interact with DOM.
DOM tree is created from the HTML document, which JS can interact with.
allows JS to create, modify, delete HTML documents, set styles, classes, attributes and listen and respond to events.
DOM is a very complex API to interact with DOM tree.


DOM tree nodes are internally represented by JS objects.
DOM nodes can be element, text, comment or document type.

*/

// Selecting an element.
/*
console.log(document.documentElement); // select entire html document
console.log(document.head); 
console.log(document.body);
*/

/*
const headerEl = document.querySelector('.header'); // Returns the first element that matches selectors.
const allSectionEl = document.querySelectorAll('.section'); // Returns List of all elements that match selectors.
console.log(headerEl); // <header class="header">
console.log(allSectionEl); // NodeList(4) [ section#section--1.section, section#section--2.section, section#section--3.section, section.section.section--sign-up ]
*/

/*
const sectionIDEl = document.getElementById('section--1'); //Returns a reference to the first object with the specified value of the ID attribute. No need to write '#' in front if the ID.
console.log(sectionIDEl); // <section id="section--1" class="section">
*/

/*
const allButtonEls = document.getElementsByTagName('button'); // Retrieves a collection of objects based on the specified element name.
console.log(allButtonEls);
// This method returns a HTMLCollection, and not a node list. HTMLCollection, unlike the node list is a live collection and changes as the DOM changes in real-time.
*/

/*
const allBtnClassEls = document.getElementsByClassName('btn'); // Returns a HTMLCollection of the elements in the object on which the method was invoked (a document or an element) that have all the classes given by classNames. The classNames argument is interpreted as a space-separated list of classes.
console.log(allBtnClassEls); // HTMLCollection { 0: button.btn.operations__tab.operations__tab--1.operations__tab--active, 1: button.btn.operations__tab.operations__tab--2, 2: button.btn.operations__tab.operations__tab--3, 3: button.btn.btn--show-modal, 4: button.btn, length: 5 }

const modalBtnEl = document.getElementsByClassName('btn btn--show-modal');
console.log(modalBtnEl); // HTMLCollection { 0: button.btn.btn--show-modal, length: 1 }
*/

// Creating and inserting elements

// 1)
// const modalBtnEl = document.querySelector('.btn--show-modal');
// modalBtnEl.insertAdjacentHTML(
//   'afterbegin',
//   '<p>Click this button to show modal.....</p>'
// );
// modalBtnEl.insertAdjacentHTML(
//   'afterend',
//   '<p>Click this button to show modal.....</p>'
// );

/*
// 2)
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent =
// 'We use cookies for improved functionalities and analytics';
message.innerHTML =
  'We use cookies for improved functionalities and analytics<button class="btn btn--close-cookie">Got it!</button>';
console.log(message);

const headerEl = document.querySelector('.header');
headerEl.append(message);
//headerEl.prepend(message);
// although added twice, still the message element will be visible only once in the DOM/page.
// because the message points to a single live element and that can exist only at a single place.
// 'prepend' adds the element as the first child
// 'append' adds the element as the last child
// to add element twice, use cloneNode method
//headerEl.append(message.cloneNode(true));
//to add elements as siblings, use before and after methods
//headerEl.before(message);
//headerEl.after(message);
*/

/*
// delete elements
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookies for improved functionalities and analytics<button class="btn btn--close-cookie">Got it!</button>';
const headerEl = document.querySelector('.header');
headerEl.append(message);
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove(); // new method to remove/delete elements
    
    // old method to remove/delete
    //message.parentElement.removeChild(message);
  });
  */

/*
// Styles

const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookies for improved functionalities and analytics<button class="btn btn--close-cookie">Got it!</button>';
const headerEl = document.querySelector('.header');
headerEl.append(message);
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

message.style.backgroundColor = '#37383d';
message.style.width = '120%';
console.log(message.style.color); // will not return anything, because only styles that are defined in the code can be accessed.
// So, alternatively we can use getComputedStyle method.
console.log(getComputedStyle(message).color); /// rgb(187, 187, 187)
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// working with CSS custom properties.
//document.documentElement.style.setProperty('--color-primary', 'orangered');

// html Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);
logo.alt = 'Beautiful minimalistic logo';

// alternative way to read attributes, which are non-standard
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

console.log(logo.src); // OP:  http://127.0.0.1:5500/AdvanceDOM/img/logo.png
console.log(logo.getAttribute('src')); //OP :  img/logo.png

const link = document.querySelector('.nav__link--btn');
console.log(link.href); //OP : http://127.0.0.1:5500/AdvanceDOM/index.html#
console.log(link.getAttribute('href')); // OP :  #

// Data Attributes
// start with data keyword
// ex :
/*
<img
  ......
  .....
  data-version-number="3.0"
/>
*/
/*
console.log(logo.dataset.versionNumber); // OP : 3.0
// use Camel case to access the data attribute.

// classes
logo.classList.add('class1', 'class2');
logo.classList.remove('class1', 'class2');
logo.classList.toggle('class1');
logo.classList.contains('class2');

// another alternative way : But don't use this, as it overrides all the existing classes.
// logo.className = 'class1 class2';
*/

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  /*
  const s1Coord = section1.getBoundingClientRect(); // getBoundingClientRect returns the coordinate w.r.t the viewport
  // So, it result keeps changing when we scroll up-down/left-right on the screen.
  console.log(s1Coord);
  console.log(e.target.getBoundingClientRect());
  console.log('Current Scroll (X/Y) : ', window.scrollX, window.scrollY);
  console.log(
    'height/width of the viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  */
  // scrolling
  /*
  const s1Coord = section1.getBoundingClientRect();
  window.scrollTo(s1Coord.left + window.scrollX, s1Coord.top + window.scrollY); // we have to add the current scroll to get the position of the section w.r.t to the actual html page. getBoundingClientRect just returns the position w.r.t the view port.
  */
  /*
  const s1Coord = section1.getBoundingClientRect();
  window.scrollTo({
    left: s1Coord.left + window.scrollX,
    top: s1Coord.top + window.scrollY,
    behavior: 'smooth',
  });
  */
  section1.scrollIntoView({ behavior: 'smooth' }); // none of the above calculations are required, if we are using this scrollIntoView method.
});

/* implementing the navigation click event functionlaity

Alternative 1 :

document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault(); // in the html, href attribute is defined. So, by default the page will get scrolled to the href section. But since we want smooth scrolling, so we will prevent the default behaviour.

    const id = this.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});
*/

/* implementing the navigation click event functionlaity

Alternative 2 :
It is a better way because in the first approach we are creating multiple copies of the callback event handler function (bcoz of the foreach loop)
*/

// 1. Add event listener to common parent element
document.querySelector('.nav__links').addEventListener('click', function (e) {
  //console.log(e.target);
  // 2. Determine What element originated the event.
  if (e.target.classList.contains('nav__link')) {
    //console.log('LINK');
    e.preventDefault();
    const id = e.target.getAttribute('href');
    //console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
  // } else {
  //   console.log('Parent NAV EL');
  // }
});

// Events in JS
// https://developer.mozilla.org/en-US/docs/Web/Events

/*
const headingH1 = document.querySelector('h1');
headingH1.addEventListener('mouseenter', function () {
  alert('hovering the mouse over the heading!!');
});
*/

/*
Alternative old school way
const headingH1 = document.querySelector('h1');
headingH1.onmouseenter = function () {
  alert('hovering the mouse over the heading!!');
};
*/

/*
// Using addEventListener gives additional advantage that we can remove the eventhandler after we have executed the function once.
const headingH1 = document.querySelector('h1');
const alertOnheading = function () {
  alert('hovering the mouse over the heading!!');
  // removing this means, we are showing this alert only once.
  headingH1.removeEventListener('mouseenter', alertOnheading);
};
headingH1.addEventListener('mouseenter', alertOnheading);
*/

/*
// Event Propagation : Bubbling and Capturing
// Whenever any event occurs, the event is first generated at the root of the document and not at the target element level. The event is then passes through all the parent element of the target element, before it actually reaches the target element, this is called target phase. When the event reaches the target element, it is handled by the eventlisteners. After this the event again travels back to the root element, this is called bubbling phase. During the bubbling phase, it is as if the event occured at those parent elements as well. So, if we are handling the event in the parent element as well, then our same event will be handled twice. When the event is handled in the parent elements in the bubbling phase, the target still remains the same.
// Event handlers by default captures only the bubbling phase. But by setting the third parameter as 'true' in the addEventListener function, we can handle events in the target phase as well. But generally it is not that useful.

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Link', e.target, e.currentTarget);
  // OP: Link
  // OP: <a class="nav__link" href="#section--1" style="background-color: rgb(15, 17, 176);">
  // OP: <a class="nav__link" href="#section--1" style="background-color: rgb(15, 17, 176);"

  console.log(e.currentTarget === this); // true

  /*
  // stop event propagation
  e.stopPropagation();
  */
/*
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Container', e.target, e.currentTarget);
  /*
  OP :
  Container 
  <a class="nav__link" href="#section--1" style="background-color: rgb(15, 17, 176);"> 
  <ul class="nav__links" style="background-color: rgb(217, 126, 101);"></ul>
*/
/*
  console.log(e.currentTarget === this); // true
});
document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target, e.currentTarget);
  /*
  OP :
  NAV 
<a class="nav__link" href="#section--1" style="background-color: rgb(15, 17, 176);"> 
<nav class="nav" style="background-color: rgb(197, 56, 62);">
*/
/*
  console.log(e.currentTarget === this); // true
});
*/

/*

*/

/*
// DOM Traversing


const h1 = document.querySelector('h1');
console.log(h1.querySelectorAll('.highlight'));

// Going downwards : child
console.log(h1.childNodes); // Returns the children. returns a nodelist
console.log(h1.children); // Returns the child elements. returns a HTMLCollection
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// Going upwards : parents
console.log(h1.parentNode);
console.log(h1.parentElement);
//h1.closest('.header').style.background = 'var(--gradient-secondary)'; // "closest" method returns the first (starting at element) inclusive ancestor/parent that matches selectors, and null otherwise.

// Going sideways : siblings
console.log(h1.previousElementSibling); // Returns the first preceding sibling that is an element, and null otherwise.
console.log(h1.previousSibling); // returns HTML element

console.log(h1.nextElementSibling);
console.log(h1.nextSibling); // returns HTML element

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/
