// Create element, can set with id et classes
const createHtmlElement = (type, id, classNames) => {
    const element = window.document.createElement(type);
    if (id) {
        element.id = id;
    }
    if(classNames) {
        element.classList.add(...classNames);
    }
    return element;
}

// Get card values from Regex
const getCardValues = (cardId) => {
    const matchesFilter = (new RegExp('^(([1-9])|([0,J,Q,K])|(A))[C,D,H,S]$')).exec(cardId);
    let cardValues = [];

    //2 3 4 5 6 7 8 9
    if(matchesFilter[2]){
        cardValues.push(parseInt(matchesFilter[2]));
    }
    
    //0 J Q K => 10
    else if(matchesFilter[3]){
        cardValues.push(10);
    }

    //A => 1 | 11
    else if(matchesFilter[4]){
        cardValues.push(1,11);
    }

    return cardValues;
}

// Disable or Active element (button) by id
const disabledElementById = (id, disabled) => {
    document.getElementById(id).disabled = disabled;
}

// Hide or Show element by id
const hideElementById = (id, hide) => {
    document.getElementById(id).style.display = hide ? 'none' : null;
}

// Auto refresh variable to get element by id
const getDynamicElementById = (id) => {
    return () => {  return window.document.getElementById(id); }
} 

// Auto refresh variable to get last child of element by id
const getDyncamicElementLastChildById = (id) => {
    return () => {  return window.document.getElementById(id).lastChild; }
} 

const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const haveDeckId = () => {
    return localStorage.getItem('deckId') ? true : false;
}

const splitArrayInLetters = (array) => {
    let letters = [];
    for(let i = 0; i < array.length; i++){
        letters.push(array[i].split(''));
    }
    return letters;
}

export { createHtmlElement, getCardValues, disabledElementById, hideElementById, getDynamicElementById, getDyncamicElementLastChildById, sleep, splitArrayInLetters, haveDeckId }
