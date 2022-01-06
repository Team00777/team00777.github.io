"use strict";

let slideIndex = 0;

getSliderTextSelectors();
getSliderImageSelectors();

function getSliderTextSelectors() {

    const slides = document.querySelectorAll(".slider-text__stories");
    const dots = document.querySelectorAll(".slider-text__dot");

    showSlides(slides, dots);

    setTimeout(getSliderTextSelectors, 7000);

}

function getSliderImageSelectors() {

    const slides = document.querySelectorAll(".slider-image__pictures");
    const dots = document.querySelectorAll(".slider-image__dot");

    slideIndex--;

    showSlides(slides, dots);

    setTimeout(getSliderImageSelectors, 7000);

}

function showSlides(slides, dots) {

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slideIndex++;

    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    for (let k = 0; k < dots.length; k++) {
        dots[k].classList.remove("active");
    }

    slides[slideIndex - 1].style.display = "flex";
    dots[slideIndex - 1].classList.add("active");

}