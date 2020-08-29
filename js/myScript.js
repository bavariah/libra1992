var slideIndex = 1;
var timer = null;
showSlides(slideIndex);

function plusSlides(n) {
  clearTimeout(timer);
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  clearTimeout(timer);
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n == undefined) {
    n = ++slideIndex;
  }
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  timer = setTimeout(showSlides, 6000);
}
const modalBtns = document.querySelectorAll(".btn-upit");
const closeBtns = document.querySelectorAll(".modal-close");
const modalOverlay = document.querySelector(".modal-overlay");
const menuBtn = document.querySelector(".menu-btn");
const modalClose = document.getElementById("id01");
const mainMenu = document.querySelector(".main-menu");
const menuClose = document.getElementById("id02");
let menuOpen = false;

menuBtn.addEventListener("click", function (btn1, btn2) {
  if (!menuOpen) {
    btn1 = mainMenu.classList.add("show");
    btn2 = menuBtn.classList.add("open");
    menuOpen = true;
  } else {
    btn1 = mainMenu.classList.remove("show");
    btn2 = menuBtn.classList.remove("open");
    menuOpen = false;
  }
});
// menuBtn.forEach(function (close) {
//   close.addEventListener("click", function (e) {
//     mainMenu.classList.remove("show");
//     menuBtn.classList.remove("show");
//   });
// });
// document
//   .querySelector(".menu-btn")
//   .addEventListener("click", () =>
//     document.querySelector(".main-menu").classList.toggle("show")
//   );

// let menuOpen = false;
// menuBtn.addEventListener("click", () => {
//   if (!menuOpen) {
//     menuBtn.classList.add("show");
//     menuOpen = true;
//   } else {
//     menuBtn.classList.remove("show");
//     menuOpen = false;
//   }
// });

modalBtns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    modalOverlay.classList.add("open-modal");
  });
});
closeBtns.forEach(function (close) {
  close.addEventListener("click", function (e) {
    modalOverlay.classList.remove("open-modal");
  });
});

window.addEventListener("click", function (event) {
  if (event.target == modalClose) {
    modalClose.classList.remove("open-modal");
  }
});
