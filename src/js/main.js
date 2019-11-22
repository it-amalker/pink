let mainNav = document.querySelector('.main-nav');
let openButton = document.querySelector('.button-nav-open');
let closeButton = document.querySelector('.button-nav-close');

let formSubmitButton = document.querySelector('.contest-form__button-js');
let closePopupButton = document.querySelector('.modal-application__close-button');
let modalFormPopup = document.querySelector('.modal-application');



openButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  mainNav.classList.add('main-nav--active');
  openButton.classList.remove('button-nav-open--active');
  closeButton.classList.add('button-nav-close--active');
})

closeButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  mainNav.classList.remove('main-nav--active');
  openButton.classList.add('button-nav-open--active');
  closeButton.classList.remove('button-nav-close--active');
})

if (modalFormPopup) {
  formSubmitButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    modalFormPopup.classList.add('modal-application--active');
  })

  closePopupButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    modalFormPopup.classList.remove('modal-application--active');
  })
}
