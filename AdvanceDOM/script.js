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

console.log(logo.src); // http://127.0.0.1:5500/AdvanceDOM/img/logo.png
console.log(logo.getAttribute('src')); // img/logo.png

const link = document.querySelector('.nav__link--btn');
console.log(link.href); //http://127.0.0.1:5500/AdvanceDOM/index.html#
console.log(link.getAttribute('href')); // #
