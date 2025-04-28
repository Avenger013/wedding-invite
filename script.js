document.querySelector('.rsvp-button').addEventListener('click', function() {
    alert('Спасибо! Мы с вами свяжемся 💌');
  });
  
const text = "ВЛАДИМИР + МАРИНА = ❤️";
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

const countdown = () => {
  const countDate = new Date('July 7, 2025 00:00:00').getTime();
  const now = new Date().getTime();
  const gap = countDate - now;

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const textDay = Math.floor(gap / day);
  const textHour = Math.floor((gap % day) / hour);
  const textMinute = Math.floor((gap % hour) / minute);
  const textSecond = Math.floor((gap % minute) / second);

  document.getElementById('days').innerText = textDay;
  document.getElementById('hours').innerText = textHour;
  document.getElementById('minutes').innerText = textMinute;
  document.getElementById('seconds').innerText = textSecond;
};

setInterval(countdown, 1000);

const music1 = document.getElementById('music1');
const music1Icon = document.getElementById('music1-icon');
let isPlaying1 = false;

const music2 = document.getElementById('music2');
const music2Icon = document.getElementById('music2-icon');
let isPlaying2 = false;

music1Icon.addEventListener('click', () => {
  if (isPlaying1) {
    music1.pause();
    music1Icon.src = 'music1-off.png';
  } else {
    music1.play();
    music1Icon.src = 'music1-on.png';
  }
  isPlaying1 = !isPlaying1;
});

music2Icon.addEventListener('click', () => {
  if (isPlaying2) {
    music2.pause();
    music2Icon.src = 'music2-off.png';
  } else {
    music2.play();
    music2Icon.src = 'music2-on.png';
  }
  isPlaying2 = !isPlaying2;
});
