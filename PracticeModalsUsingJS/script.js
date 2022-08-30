'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
/*
    Query selector only selects the first element, 
    if multiple elements match the class-name.
*/
// const btnOpenModal = document.querySelector('.show-modal');
// console.log(modal, overlay, btnCloseModal, btnOpenModal);

const btnsOpenModal = document.querySelectorAll('.show-modal');

// console.log(typeof btnsOpenModal, btnsOpenModal);
// console.log(typeof btnsOpenModal[0], btnsOpenModal[0].textContent);
const closeModal = function () {
  if (!modal.classList.contains('hidden')) {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
  }
};
const openModal = function () {
  // console.log(event);
  // console.log(modal);
  // console.log(modal.classList);

  /*
    Manipulating classes using DOM / JS
    */
  if (modal.classList.contains('hidden')) {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  }
};

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener('click', openModal);
}

/*
Event handling in case of keybord key press
*/

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});
