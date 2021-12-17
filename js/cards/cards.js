let myDeck = localStorage.getItem('deckId') ? localStorage.getItem('deckId') : await getDeck();

let deckPile = null;
let staticDeck = null;
let reShuffle = null;

const deckElement = window.document.getElementById('deck');
const deckCountElement = window.document.getElementById('deck-count');

async function getDeck() {
    return await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1&jokers_enabled=false').then(response => response.json()).then(data => {
        const deckId = data.deck_id;
        localStorage.setItem('deckId', deckId);
        return deckId;
    })
}

const getDeckInfo = async (deck_id) => {
    return await fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/`).then(response => response.json()).then(data => {
        return data;
    });
}

const checkDeck = async() => {
    const { remaining } = await getDeckInfo(myDeck);

    if (myDeck && remaining >= 0) {
        deckCountElement.innerHTML = remaining;
    }
    
    switch (remaining) {
        case 0:
            deckPile.remove();
            deckCountElement.innerHTML = 'Plus de cartes dans le deck';
            reShuffle.innerHTML = 'Re-shuffle';
            deckElement.appendChild(reShuffle);
            break;
        case 1:
            staticDeck.remove();
            break;
        default:
            deckPile.src = '../assets/img/back_deck.png';
            staticDeck.src = '../assets/img/back_deck.png';
            deckElement.append(deckPile, staticDeck);
            break;
    }
}

const deckPileEvent = async () => {
    deckPile.removeEventListener('click', deckPileEvent, false);
    const card = await drawCardFromDeck(myDeck, 1);

    await checkDeck();
    deckPile.src = card[0].image;
    deckPile.addEventListener('click', deckPileEvent, false);
}

const reShuffleEvent = async () => {
    reShuffle.removeEventListener('click', reShuffleEvent, false);
    reShuffle.remove();
    myDeck = await getDeck();
    await showDeck();
    reShuffle.addEventListener('click', reShuffleEvent, false);
}

export const drawCardFromDeck = async (deck_id, number_cards) => {
    const arr = [];
    await fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${number_cards}`).then(response => response.json()).then(data => {
        for (let i = 0; i < data.cards.length; i++) {
            arr.push(data.cards[i]);
        }
    })
    return arr;
}

export const showDeck = async () => {
    deckPile = window.document.createElement('img');
    staticDeck = window.document.createElement('img');
    reShuffle = window.document.createElement('button');
    
    staticDeck.id = 'absolute-back-deck';
    deckPile.id = 'deck-pile';

    checkDeck();

    deckPile.addEventListener('click', deckPileEvent, false);
    reShuffle.addEventListener('click', reShuffleEvent, false);
}

