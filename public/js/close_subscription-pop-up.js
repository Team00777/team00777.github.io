"use strict"

const closePopUpElem = document.querySelector(".subscription-pop-up__close");

if (closePopUpElem) {
    closePopUpElem.addEventListener("click", closeSubscriptionPopUp);
}

function closeSubscriptionPopUp() {
    const popUpElem = document.querySelector(".subscription-pop-up");
    popUpElem.style.display = "none";
}