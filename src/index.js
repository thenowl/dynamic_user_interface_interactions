import './styles.css';

// Toggle drop-down menu function:

function toggleDropDownVisibility() {
  this.nextElementSibling.classList.toggle('visible');
}

const imageContainer = document.querySelector('#imageContainer');
const computedWidth = window
  .getComputedStyle(imageContainer)
  .getPropertyValue('width');
const containerWidth = parseInt(computedWidth, 10);
const navCirclesContainer = document.querySelector('#navCirclesContainer');
let carouselPositionCounter = 1;

// Highlight navigation circles:

function highlightCircles() {
  const circlesList = navCirclesContainer.querySelectorAll('div');
  circlesList.forEach((element) => {
    element.classList.remove('selected');
  });
  circlesList[carouselPositionCounter - 1].classList.add('selected');
}

// Switch to image to the left:

function moveToLeftImage() {
  const computedPosition = window
    .getComputedStyle(imageContainer)
    .getPropertyValue('left');
  const currentPosition = parseInt(computedPosition, 10);

  if (currentPosition === 0) {
    imageContainer.style.left = `${-containerWidth + 1280}px`;
    carouselPositionCounter = imageContainer.querySelectorAll('img').length;
    highlightCircles();
    return;
  }

  imageContainer.style.left = `${currentPosition + 1280}px`;
  carouselPositionCounter -= 1;
  highlightCircles();
}

// Switch to image to the right:

function moveToRightImage() {
  const computedPosition = window
    .getComputedStyle(imageContainer)
    .getPropertyValue('left');
  const currentPosition = parseInt(computedPosition, 10);

  if (-currentPosition === containerWidth - 1280) {
    imageContainer.style.left = '0px';
    carouselPositionCounter = 1;
    highlightCircles();
    return;
  }

  imageContainer.style.left = `${currentPosition - 1280}px`;
  carouselPositionCounter += 1;
  highlightCircles();
}

(function autoSlideShow() {
  moveToRightImage();
  setTimeout(() => {
    autoSlideShow();
  }, 5000);
})();

// Event Listeners:

const productsLink = document.querySelector('#productsLink');
const aboutLink = document.querySelector('#aboutLink');
const contactLink = document.querySelector('#contactLink');

productsLink.addEventListener('click', toggleDropDownVisibility);
aboutLink.addEventListener('click', toggleDropDownVisibility);
contactLink.addEventListener('click', toggleDropDownVisibility);

const leftArrow = document.querySelector('#leftArrow');
const rightArrow = document.querySelector('#rightArrow');

leftArrow.addEventListener('click', moveToLeftImage);
rightArrow.addEventListener('click', moveToRightImage);

// Select image via navigation circles:

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('navigation-circles')) {
    const circleIndex = Array.from(
      navCirclesContainer.querySelectorAll('div'),
    ).indexOf(e.target);

    imageContainer.style.left = `${-circleIndex * 1280}px`;
    carouselPositionCounter = circleIndex + 1;
    highlightCircles();
  }
});
