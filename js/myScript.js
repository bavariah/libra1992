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

document
  .querySelector(".menu-btn")
  .addEventListener("click", () =>
    document.querySelector(".main-menu").classList.toggle("show")
  );

const menuBtn = document.querySelector(".menu-btn");
let menuOpen = false;
menuBtn.addEventListener("click", () => {
  if (!menuOpen) {
    menuBtn.classList.add("show");
    menuOpen = true;
  } else {
    menuBtn.classList.remove("show");
    menuOpen = false;
  }
});
const modalBtns = document.querySelectorAll(".btn-upit");
const closeBtn = document.querySelector(".modal-close");
const modalOverlay = document.querySelector(".modal-overlay");

modalBtns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    modalOverlay.classList.add("open-modal");
  });
});

closeBtn.addEventListener("click", function () {
  modalOverlay.classList.remove("open-modal");
});
