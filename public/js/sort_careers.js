"use strict"

const searchButtonElem = document.querySelector(".search .button");

searchButtonElem.addEventListener("click", filterCareers);

function filterCareers() {

    const inputValue = getInputValue();  
    const careerList = getCareersList();
    const careerCardsElems = [...careerList.children];

    if (inputValue === "") {
        showAllCareers(careerCardsElems);
        return;
    }

    let isCareerFound = false;

    const searchedCareer = careerCardsElems
                                        .filter((elem) => elem.firstElementChild.innerHTML.toUpperCase()
                                                                                                        .includes(inputValue.toUpperCase()))
                                        .reduce((result, elem) => result = elem.firstElementChild.innerHTML, "");

    if (searchedCareer !== "") {
        isCareerFound = true;
    }

    renderCareerList(careerCardsElems, searchedCareer, isCareerFound);

}

const seeMoreButton = document.querySelector(".career .button-secondary");
const noResultMsg = document.querySelector(".search__message");

function renderCareerList(careerCardsElems, searchedCareer, isCareerFound) {

    noResultMsg.style.display = "none";

    if (!isCareerFound) {
        noResultMsg.style.display = "inline-block";
        return;
    }

    careerCardsElems.forEach((elem) => {
        if (elem.firstElementChild.innerHTML === searchedCareer) {
            elem.style.display = "block";
        } else {
            elem.style.display = "none";
        }
    })

    seeMoreButton.style.display = "none";
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

function showAllCareers(careerCardsElems) {
    
    noResultMsg.style.display = "none";
    seeMoreButton.style.display = "block";

    careerCardsElems.forEach((elem) => {
        elem.style.display = "block";
    })
}