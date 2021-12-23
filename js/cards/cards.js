import { createElement, deckAnimation, shuffleDeckAnimation, distributeAnimation, flipCardAnimation, getCardValues} from './generic/index.js';
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
// const DealerZone = window.document.getElementById('dealer-container');

const checkDeck = async () => {
    const { remaining } = await getDeckInfo(myDeck);

    if (myDeck && remaining >= 0) {
        deckCountElement.innerHTML = remaining;
    }

    switch (remaining) {
        case 0:
            reShuffle = createElement('button', 're-shuffle', ['btn']);
            reShuffle.innerHTML = 'Shuffle Deck';
            reShuffle.addEventListener('click', reShuffleEvent, false);
            deckCountElement.innerHTML = 'Plus de cartes dans le deck';
            deckCountElement.appendChild(reShuffle);
            break;
        default:
            await firstDeckCard.addEventListener('click', cardEvent, false);
            break;
    }
};

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

const playerDeckFlipCardEvent = async () => {
    playerZone.lastChild.removeEventListener('click', playerDeckFlipCardEvent, false);
    window.document.removeEventListener('keydown', onKeyDownEvent, false);

    let card_inner = playerZone.lastChild.querySelector('.card-inner');
    let card_front = card_inner.querySelector('.card-front');

    const drawCard = await drawCardFromDeck(myDeck, 1);
    const cardValues = getCardValues(drawCard[0].code);

    await checkDeck();

    card_front.src =  drawCard[0].image;

    flipCardAnimation(card_inner, `500ms`);

    window.document.addEventListener('keydown', onKeyDownEvent, false);
}

const returnCardToDeck = async () => {
    playerZone.lastChild.removeEventListener('click', returnCardToDeck, false);
    window.document.removeEventListener('keydown', onKeyDownEvent, false);
    
    let card = playerZone.lastChild;
    let card_inner = card.querySelector('.card-inner');
    card_inner.style.transform = null;
    window.setTimeout(() => {
        deckElement.append(card);
        card_inner.style.top = null;
        card_inner.style.left = null;
        card.addEventListener('click', cardEvent, false);
        window.document.addEventListener('keydown', onKeyDownEvent, false);
        firstDeckCard = card;
    }, 500);
}

const cardEvent = async () => {
    firstDeckCard.removeEventListener('click', cardEvent, false);
    window.document.removeEventListener('keydown', onKeyDownEvent, false);

    let card_inner = firstDeckCard.querySelector('.card-inner');

    firstDeckCard.style['animation-name'] = null;

    let oldRect = firstDeckCard.getBoundingClientRect();
    playerZone.appendChild(firstDeckCard);
    let newRect = firstDeckCard.getBoundingClientRect();

    distributeAnimation(card_inner, oldRect, newRect, `500ms`);
    
    window.setTimeout(()=> {
        playerZone.lastChild.addEventListener('click', playerDeckFlipCardEvent, false);
        // .addEventListener('click', returnCardToDeck, false); //add event to return button
    }, 500);

    firstDeckCard = deckElement.lastChild;
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

const onKeyDownEvent = async (e) => {
    if (isDeckCreated) {
        switch (e.keyCode) {
            case 68: // d
                await cardEvent();
                break;
            case 83: // s
                console.log('Stand');
                break; 
            case 67: // c
                console.log('Cancel draw card event');
                break;
            case 82: // r
                await reShuffleEvent();
                break;
            default:
                break;
        }
    } 
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

    window.document.addEventListener('keydown', onKeyDownEvent, false);
}
