import { createElement } from './generic/index.js';
import { getDeck, getDeckInfo, drawCardFromDeck
} from '../api/index.js';

let firstDeckCard = null;
let reShuffle = null;
let playerCard = null;
let myDeck = localStorage.getItem('deckId') ? localStorage.getItem('deckId') : await getDeck();
let isDeckCreated = false;

const playerZone = window.document.getElementById('player-container');
const deckElement = window.document.getElementById('deck');
const deckCountElement = window.document.getElementById('deck-count');

const checkDeck = async () => {
    const { remaining } = await getDeckInfo(myDeck);

    if (myDeck && remaining >= 0) {
        deckCountElement.innerHTML = remaining;
    }

    switch (remaining) {
        case 0:
            reShuffle = createElement('button', 're-shuffle');
            reShuffle.innerHTML = 'Re-shuffle';
            reShuffle.addEventListener('click', reShuffleEvent, false);
            deckCountElement.innerHTML = 'Plus de cartes dans le deck';
            deckCountElement.appendChild(reShuffle);
            break;
        default:
            await firstDeckCard.addEventListener('click', cardEvent, false);
            break;
    }
};

const deckAnimation = (element, nameKeyFrame, time) => {
    requestAnimationFrame(() => {
        element.style.animationName = nameKeyFrame;
        element.style.animationDuration = time;
        element.style.animationTimingFunction = 'ease-in-out';
        element.style.animationFillMode = 'forwards';
    });
}

const shuffleDeckAnimation = () => {
    deckElement.childNodes.forEach(card => {
        //do something
    });
}

const createDeck = async () => {
    const { remaining } = await getDeckInfo(myDeck);

    for (let i = 0; i < remaining; i++) {
        let card = await createElement('div', null, ["card"]);
        let card_inner = createElement('div', null, ["card-inner"]);
        let card_back = createElement('img', null, ["card-back"]);
        let card_front = createElement('img', null, ["card-front"]);

        card.append(card_inner);
        card_inner.append(card_back, card_front);
        card_back.src = '../assets/img/back.png';
        
        card.style.margin = `${i * -0.3}px 0 0 ${i * -0.2}px`;
        deckElement.append(card);
        deckAnimation(card, 'generate-deck-pile', `${i / remaining}s`);
    }

    firstDeckCard = deckElement.lastChild;

    isDeckCreated = true;
    showDeck();
}

const cardEvent = async () => {
    firstDeckCard.removeEventListener('click', cardEvent, false);
    const drawCard = await drawCardFromDeck(myDeck, 1);
    await checkDeck();

    deckElement.removeChild(firstDeckCard);

    let car_inner = firstDeckCard.querySelector('.card-inner');
    let card_front = car_inner.querySelector('.card-front');

    card_front.src =  drawCard[0].image;
    firstDeckCard.style = null;

    playerZone.appendChild(firstDeckCard);
    deckAnimation(car_inner, 'card-return', `1s`);

    if(deckElement.lastChild){
        firstDeckCard = deckElement.lastChild;
        firstDeckCard.addEventListener('click', cardEvent, false);
    }
}

const reShuffleEvent = async () => {
    reShuffle.removeEventListener('click', reShuffleEvent, false);
    reShuffle.remove();
    while (playerZone.lastElementChild) {
        playerZone.removeChild(playerZone.lastElementChild);
    }
    isDeckCreated = false;
    myDeck = await getDeck();
    await showDeck();
    reShuffle.addEventListener('click', reShuffleEvent, false);
}

export const showDeck = async () => {

    switch (isDeckCreated) {
        case false:
            await createDeck();
            break;
        case true:
            await checkDeck();
            break;
        default:
            break;
    }
    
}

