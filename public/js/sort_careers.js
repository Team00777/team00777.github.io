"use strict"

const searchButtonElem = document.querySelector(".search .button");

searchButtonElem.addEventListener("click", filterCareers);

function filterCareers() {

    const inputValue = getInputValue();  
    const careerList = getCareersList();
    const careerCardsElems = [...careerList.children];

    let isCareerFound = false;

    const foundCareer = careerCardsElems.filter((elem) => elem.firstElementChild.innerHTML.toUpperCase()
                                                                                                        .includes(inputValue.toUpperCase()))
                                        .reduce((result, elem) => result = elem.firstElementChild.innerHTML, "");

    if (!foundCareer || inputValue === "") {
        renderCareerList(careerCardsElems, inputValue, isCareerFound);
        return;
    }

    isCareerFound = true;

    renderCareerList(careerCardsElems, foundCareer, isCareerFound);

}

function renderCareerList(careerCardsElems, searchedCareer, isCareerFound) {

    const seeMoreButton = document.querySelector(".career .button-secondary");
    const noResultMsg = document.querySelector(".career__message");

    noResultMsg.style.display = "none";

    if (isCareerFound) {
        seeMoreButton.style.display = "none";

    } else if (searchedCareer === "") {
        seeMoreButton.style.display = "block";

    } else {
        noResultMsg.style.display = "flex";
        seeMoreButton.style.display = "none";
    }

    careerCardsElems.forEach((elem) => {

        if (searchedCareer === "" || elem.firstElementChild.innerHTML === searchedCareer) {
            elem.style.display = "block";
        } else {
            elem.style.display = "none";
        }
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