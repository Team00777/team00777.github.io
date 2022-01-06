"use strict"

const searchButtonElem = document.querySelector(".search .button");

searchButtonElem.addEventListener("click", filterCareers);

function filterCareers() {

    const inputValue = getInputValue();
    const careerList = getCareersList();
    const careerCardsElems = [...careerList.children];

    let isCareerFound = false;

    const foundCareers = careerCardsElems.filter((elem) => elem.firstElementChild.innerHTML.toUpperCase()
                                                                                                        .includes(inputValue.toUpperCase()));

                                                                                                 
    if (foundCareers.length !== 0) {
        isCareerFound = true;
    }

    showSeeMoreBtn(inputValue);
    renderCareerList(careerCardsElems, foundCareers, isCareerFound);

}

function renderCareerList(careerCardsElems, foundCareers, isCareerFound) {

    const noResultMsg = document.querySelector(".career__message");

    if (isCareerFound) {
        noResultMsg.style.display = "none";
    } else {
        noResultMsg.style.display = "flex";
    }

    careerCardsElems.forEach((elem) => {
        elem.style.display = "none";
    })

    foundCareers.forEach((elem) => {
        elem.style.display = "block";
    })
}

function getInputValue() {
    
    const inputElement = document.querySelector(".search__input");
    const currentValue = inputElement.value;
    inputElement.value = "";
    return currentValue;
}

function getCareersList() {
    return document.querySelector(".career__list");
}

function showSeeMoreBtn(inputValue) {

    const seeMoreButton = document.querySelector(".career .button-secondary");

    if (inputValue === "") {
        seeMoreButton.style.display = "block";
        return;
    }
    
    seeMoreButton.style.display = "none";
}