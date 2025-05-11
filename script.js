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
      setTimeout(typeEffect, 120);
    }
  } else {
    typedText.textContent = text.substring(0, index - 1);
    index--;

    if (index === 0) {
      isDeleting = false;
      setTimeout(typeEffect, 3000); // пауза перед новым вводом
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

document.addEventListener("DOMContentLoaded", () => {
  typeEffect(); // уже есть

  // МУЗЫКА
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
});

document.getElementById('rsvp-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const form = e.target;
  const nameFields = form.querySelectorAll('.name-field');
  const errorMsg = form.querySelector('.error-msg');
  const errorMsg2 = form.querySelector('.error-msg2');
  const drinkCheckboxes = form.querySelectorAll('input[name="drinks"]');

  let atLeastOneNameFilled = false;

  // Сброс ошибок
  errorMsg.style.display = 'none';
  errorMsg2.style.display = 'none';
  nameFields.forEach(f => f.classList.remove('error'));
  drinkCheckboxes.forEach(cb => cb.classList.remove('error'));

  nameFields.forEach(field => {
    if (field.value.trim()) {
      atLeastOneNameFilled = true;
    }
  });

  if (!atLeastOneNameFilled) {
    errorMsg.textContent = "Заполните хотя бы одно поле выше";
    errorMsg.style.display = 'block';
    nameFields.forEach(f => f.classList.add('error'));
    return;
  }

  const selectedDrinks = [...form.querySelectorAll('input[name="drinks"]:checked')];
  if (selectedDrinks.length === 0) {
    errorMsg2.style.display = 'block';
    drinkCheckboxes.forEach(cb => cb.classList.add('error'));
    return;
  }

  const attendanceMap = {
    yes: "Я приеду / Мы приедем",
    later: "Скажу ответ позже",
    no: "Приехать не получится"
  };
  const drinksMap = {
    vodka: "Водка",
    whisky: "Виски",
    white_wine: "Белое вино",
    red_wine: "Красное вино",
    moonshine: "Самогон",
    no_alcohol: "Не пью алкоголь"
  };

  const data = {
    name1: nameFields[0].value.trim(),
    name2: nameFields[1].value.trim(),
    name3: nameFields[2].value.trim(),
    attendance: attendanceMap[form.attendance.value],
    drinks: selectedDrinks.map(el => drinksMap[el.value])
  };

  fetch('/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(res => res.text())
    .then(text => alert(text === "OK" ? "Спасибо!" : "Ошибка"))
    .catch(err => {
      console.error(err);
      alert("Ошибка при отправке");
    });
});

// Убрать ошибку при вводе имени
document.querySelectorAll('.name-field').forEach(field => {
  field.addEventListener('input', () => {
    const nameFields = document.querySelectorAll('.name-field');
    const errorMsg = document.querySelector('.error-msg');

    const atLeastOneFilled = Array.from(nameFields).some(f => f.value.trim());

    if (atLeastOneFilled) {
      errorMsg.style.display = 'none';
      nameFields.forEach(f => f.classList.remove('error'));
    }
  });
});


// Убрать ошибку при выборе напитков
document.querySelectorAll('input[name="drinks"]').forEach(cb => {
  cb.addEventListener('change', () => {
    document.querySelector('.error-msg2').style.display = 'none';
    document.querySelectorAll('input[name="drinks"]').forEach(c => c.classList.remove('error'));
  });
});

function revealOnScroll() {
  const elements = document.querySelectorAll(
    '.calendar_on, .location_on, .program_on, .rsvp-form_on, .details_on, .countdown-section'
  );

  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight - 100) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);








