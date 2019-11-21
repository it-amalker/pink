let mainNav = document.querySelector('.main-nav');
let openButton = document.querySelector('.logo__button-nav-open');
let closeButton = document.querySelector('.logo__button-nav-close');



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
