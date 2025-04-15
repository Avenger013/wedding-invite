document.querySelector('.rsvp-button').addEventListener('click', function() {
    alert('Спасибо! Мы с вами свяжемся 💌');
  });
  
const text = "Паша + Оля = ❤️";
const typedText = document.querySelector(".typed-text");

let index = 0;
let isDeleting = false;

function typeEffect() {
  if (!isDeleting) {
    typedText.textContent = text.substring(0, index + 1);
    index++;

    if (index === text.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1200); // пауза перед удалением
    } else {
      setTimeout(typeEffect, 150);
    }
  } else {
    typedText.textContent = text.substring(0, index - 1);
    index--;

    if (index === 0) {
      isDeleting = false;
      setTimeout(typeEffect, 500); // пауза перед новым вводом
    } else {
      setTimeout(typeEffect, 100);
    }
  }
}

// Анимация при прокрутке вниз
function showOnScroll() {
    const element = document.querySelector('.invitation');
    const position = element.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;
  
    if (position < screenHeight - 100) {
      element.classList.add('show-on-scroll');
    }
  }
  
  window.addEventListener('scroll', showOnScroll);
  window.addEventListener('load', showOnScroll);

document.addEventListener("DOMContentLoaded", () => {
  typeEffect();
});

