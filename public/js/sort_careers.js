"use strict"

const searchButtonElem = document.querySelector(".search .button");

searchButtonElem.addEventListener("click", filterCareers);

function filterCareers() {

    const inputValue = getInputValue();
    console.log(inputValue);
    
    const careerList = getCareersList();
    const careerCardsElems = [...careerList.children];

    console.log(careerCardsElems);

    const filteredCareers = careerCardsElems.filter((elem) => elem.firstElementChild.innerHTML === inputValue);
    console.log(filteredCareers);

    hideNotSearchedCareers(careerCardsElems, filteredCareers);

}

function hideNotSearchedCareers(careerCardsElems, filteredCareers) {
    const currentCareer = filteredCareers.reduce((result, elem) => result = elem.firstElementChild.innerHTML, "");

    careerCardsElems.forEach((elem) => {
        if(elem.firstElementChild.innerHTML !== currentCareer) {
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