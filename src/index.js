import './styles.css';

const productsLink = document.querySelector('#productsLink');
const aboutLink = document.querySelector('#aboutLink');
const contactLink = document.querySelector('#contactLink');

function toggleDropDownVisibility() {
  this.nextElementSibling.classList.toggle('visible');
}

productsLink.addEventListener('click', toggleDropDownVisibility);
aboutLink.addEventListener('click', toggleDropDownVisibility);
contactLink.addEventListener('click', toggleDropDownVisibility);
