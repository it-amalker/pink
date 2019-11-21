let mainNav = document.querySelector('.main-nav');
let openButton = document.querySelector('.logo__button-nav-open');
let closeButton = document.querySelector('.logo__button-nav-close');

let formSubmitButton = document.querySelector('.contest-form__button-js');
let closePopupButton = document.querySelector('.modal-application__close-button');
let modalFormPopup = document.querySelector('.modal-application');



openButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  mainNav.classList.add('main-nav--active');
  openButton.classList.remove('logo__button-nav-open--active');
  closeButton.classList.add('logo__button-nav-close--active');
})

closeButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  mainNav.classList.remove('main-nav--active');
  openButton.classList.add('logo__button-nav-open--active');
  closeButton.classList.remove('logo__button-nav-close--active');
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
