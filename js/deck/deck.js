import { func } from '../generic/index.js';
import { anim } from '../animations/index.js';
import { api } from '../api/index.js';
import { game } from '../game/index.js';

const playerAreaElement = func.getDynamicElementById('player-container');
const dealerAreaElement = func.getDynamicElementById('dealer-container');

const deckAreaElement = func.getDynamicElementById('deck');
const cardRemainingElement = func.getDynamicElementById('deck-count');

const firstDeckCard = func.getDyncamicElementLastChildById('deck');
const firstPlayerCard = func.getDyncamicElementLastChildById('player-container');
const firstDealerCard = func.getDyncamicElementLastChildById('dealer-container');

const cardBackSrc = '../assets/img/back.png';

let deckMaxCard = 52;
let deckId = localStorage.getItem('deckId');

// Init new deck
const init = async () => {
    deckId = !func.haveDeckId() ? await api.getDeck() : localStorage.getItem('deckId');
    const { remaining } = await getDeckInfo();

    cardRemainingElement().innerHTML = remaining;

    for (let i = 1; i <= remaining; i++) {
        let card = func.createHtmlElement('div', null, ["card"]);
        let card_inner = func.createHtmlElement('div', null, ["card-inner"]);
        let card_back = func.createHtmlElement('img', null, ["card-back"]);
        let card_front = func.createHtmlElement('img', null, ["card-front"]);

        card.append(card_inner);
        card_inner.append(card_back, card_front);
        card_back.src = cardBackSrc;
        
        card.style.margin = `${i * -0.3}px 0 0 ${i * -0.2}px`;
        deckAreaElement().append(card);
        anim.createDeck(card, 'generate-deck-pile', `${i / remaining}s`);
    }

    // Wait end of animation
    await func.sleep(1000);

    if(firstDeckCard()){
        game.save();

        firstDeckCard().event = true;
        firstDeckCard().addEventListener('click', addCardIntoPlayerArea, { once: true });
        window.document.addEventListener('keydown', keydownListener);
    }
}

// Stop game, remove event listener
const stop = () => {
    window.document.removeEventListener('keydown', keydownListener);
    if(firstDeckCard()){
        firstDeckCard().event = undefined;
        firstDeckCard().removeEventListener('click', addCardIntoPlayerArea);
    }
    if(firstPlayerCard()){
        firstPlayerCard().event = undefined;
        firstPlayerCard().removeEventListener('click', playerFlipCard);
    }
}

// Reset deck and start new game
const reset = async () => {
    stop();
    returnAllPlayerCards();
    returnAllDealerCards();
    while(firstDealerCard() || firstPlayerCard()){ await func.sleep(100); }
    shuffle();
    deckId = await api.getDeck();
    const { remaining } = await getDeckInfo();
    cardRemainingElement().innerHTML = remaining;
    game.save();
    firstDeckCard().event = true;
    firstDeckCard().addEventListener('click', addCardIntoPlayerArea, { once: true });
    window.document.removeEventListener('keydown', keydownListener);
    window.document.addEventListener('keydown', keydownListener);
}

// Load all deck event listener
const loadEventsListener = async () => {
    // deckId = !func.haveDeckId() ? await api.getDeck() : localStorage.getItem('deckId');
    window.document.addEventListener('keydown', keydownListener);
    if(firstDeckCard()){
        firstDeckCard().event = true;
        firstDeckCard().addEventListener('click', addCardIntoPlayerArea, { once: true });
    }
}

const shuffle = () => {
    alert('suffle animation !');
}

// Get deck info
const getDeckInfo = async () => {
    if(deckId){
        return await api.getDeckInfo(deckId);
    }
    return null;
}

// Action on deck cards remaining
const checkDeck = (remaining) => {
    if(remaining === deckMaxCard - 1){
        window.document.getElementById('shuffleDeck').addEventListener('click', game.shuffle);
        func.disabledElementById('shuffleDeck', false);
    }
    else if(remaining === 0) {
        window.document.getElementById('stopGame').removeEventListener('click', game.stop);
        func.hideElementById('stopGame', true);
        func.hideElementById('newGame', false);
        window.document.getElementById('newGame').addEventListener('click', game.reset, { once: true });
        stop();
    }
    game.save();
}

// Add deck card into player area
const addCardIntoPlayerArea = async () => {
    firstDeckCard().event = undefined;
    const { remaining } = await getDeckInfo();
    cardRemainingElement().innerHTML = remaining - 1;

    let card_inner = firstDeckCard().querySelector('.card-inner');
    firstDeckCard().style['animation-name'] = null;

    let oldRect = firstDeckCard().getBoundingClientRect();
    playerAreaElement().appendChild(firstDeckCard());
    let newRect = firstPlayerCard().getBoundingClientRect();

    anim.distributeCard(card_inner, oldRect, newRect, `400ms`);
    
    await func.sleep(400);

    cardRemainingElement().innerHTML = remaining - 1;
    firstPlayerCard().event = true;
    firstPlayerCard().addEventListener('click', playerFlipCard, { once: true });
}

// Add deck card into dealer area
const addCardIntoDealerArea = async () => {
    firstDeckCard().event = undefined;
    firstDeckCard().removeEventListener('click', addCardIntoPlayerArea);
    const { remaining } = await getDeckInfo();
    cardRemainingElement().innerHTML = remaining - 1;

    let card_inner = firstDeckCard().querySelector('.card-inner');
    firstDeckCard().style['animation-name'] = null;

    let oldRect = firstDeckCard().getBoundingClientRect();
    dealerAreaElement().appendChild(firstDeckCard());
    let newRect = firstDealerCard().getBoundingClientRect();

    anim.distributeCard(card_inner, oldRect, newRect, `400ms`);
    
    await func.sleep(400);

    cardRemainingElement().innerHTML = remaining - 1;

    firstDeckCard().event = true;
    firstDeckCard().addEventListener('click', addCardIntoPlayerArea, { once: true });
}

// Return last player card to deck
const playerReturnCardToDeck = async () => {
    const { remaining } = await getDeckInfo();

    let card_inner = firstPlayerCard().querySelector('.card-inner');
    card_inner.style.transform = null;

    await func.sleep(500);

    cardRemainingElement().innerHTML = remaining;
    deckAreaElement().append(firstPlayerCard());
    card_inner.style.top = null;
    card_inner.style.left = null;
    firstDeckCard().event = true;
    firstDeckCard().addEventListener('click', addCardIntoPlayerArea, { once: true });
}

// Player flip card
const playerFlipCard = async () => {
    firstPlayerCard().event = undefined;
    let card_inner = firstPlayerCard().querySelector('.card-inner');
    let card_front = card_inner.querySelector('.card-front');

    const drawCard = await api.drawCardFromDeck(deckId, 1);
    const cardValues = func.getCardValues(drawCard[0].code);

    const { remaining } = await getDeckInfo();

    card_front.src =  drawCard[0].image;

    anim.flipCard(card_inner, `300ms`);

    await func.sleep(300);

    checkDeck(remaining);

    if(firstDeckCard()){
        firstDeckCard().event = true;
        firstDeckCard().addEventListener('click', addCardIntoPlayerArea, { once: true });
    }
}

// Recursive player card return
const returnAllPlayerCards = async () => {
    if(firstPlayerCard()){
        let card_inner = firstPlayerCard().querySelector('.card-inner');
        let card_front = card_inner.querySelector('.card-front');

        card_inner.style.transition = 'all 100ms ease 0s';
        card_inner.style.transform = null;
        card_front.removeAttribute('src');

        await func.sleep(100);

        deckAreaElement().append(firstPlayerCard());
        card_inner.style.top = null;
        card_inner.style.left = null;
        returnAllPlayerCards();
    }
}

// Recursive dealer card return
const returnAllDealerCards = async () => {
    if(firstDealerCard()){
        let card_inner = firstDealerCard().querySelector('.card-inner');
        let card_front = card_inner.querySelector('.card-front');

        card_inner.style.transition = 'all 100ms ease 0s';
        card_inner.style.transform = null;
        card_front.removeAttribute('src');

        await func.sleep(100);

        deckAreaElement().append(firstDealerCard());
        card_inner.style.top = null;
        card_inner.style.left = null;
        returnAllDealerCards();
    }
}

// Keyboard event listener
const keydownListener = (event) => {
    switch(event.key){
        // Return last player card to deck
        case 'c':
        // Player flip card
        case 'f':
            if(firstPlayerCard()) {
                if(firstPlayerCard().event === true){
                    firstPlayerCard().event = undefined;
                    firstPlayerCard().removeEventListener('click', playerFlipCard);

                    if(event.key === 'c'){
                        playerReturnCardToDeck();
                    }
                    else{
                        playerFlipCard();
                    }
                }
            }
            break;
        // Add deck card into player area
        case 'd':
            if(firstDeckCard()){
                if(firstDeckCard().event === true){
                    firstDeckCard().event = undefined;
                    firstDeckCard().removeEventListener('click', addCardIntoPlayerArea);
                    addCardIntoPlayerArea();
                }
            }
            break;
        // Shuffle deck card
        case 'r':
            break;
    }
}

export { init, stop, loadEventsListener ,reset, shuffle, getDeckInfo, keydownListener }