/** 
 * @function
 * @description - This function will return a deck of cards
 */
 const getDeck = async () => {
    return await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').then(response => response.json()).then(data => {
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

const checkDeck = async(myDeck, deckCount, deckPile, deckFromHtml, reShuffle, staticDeck) => {
    const { remaining } = await getDeckInfo(myDeck);
    if (myDeck && remaining >= 0) {
        deckCount.innerHTML = remaining;
    }
    switch (remaining) {
        case 0:
            deckPile.remove();
            deckCount.innerHTML = 'Plus de cartes dans le deck';
            reShuffle.innerHTML = 'Re-shuffle';
            deckFromHtml.appendChild(reShuffle);
            break;
        case 1:
            staticDeck.remove();
            break;
        default:
            deckPile.src = '../assets/img/back_deck.png';
            staticDeck.src = '../assets/img/back_deck.png';
            deckFromHtml.appendChild(deckPile);
            deckFromHtml.appendChild(staticDeck);
            break;
    }
}

const deckPileEvent = async (myDeck, deckCount, deckPile, deckFromHtml, reShuffle, staticDeck) => {
    await drawCardFromDeck(myDeck, 1);
    await checkDeck(myDeck, deckCount, deckPile, deckFromHtml, reShuffle, staticDeck);
}

const reShuffleEvent = async (reShuffle) => {
    reShuffle.remove();
    await getDeck();
    await showDeck();
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
    const myDeck = localStorage.getItem('deckId') ? localStorage.getItem('deckId') : await getDeck();

    const deckFromHtml = window.document.getElementById('deck');
    const deckCount = window.document.getElementById('deck-count');

    const staticDeck = window.document.createElement('img');
    staticDeck.id = 'absolute-back-deck';
    const deckPile = window.document.createElement('img');
    deckPile.id = 'deck-pile';
    const reShuffle = window.document.createElement('button');
    
    checkDeck(myDeck, deckCount, deckPile, deckFromHtml, reShuffle, staticDeck)

    deckPile.addEventListener('click', () => { deckPileEvent(myDeck, deckCount, deckPile, deckFromHtml, reShuffle, staticDeck) }, false);
    reShuffle.addEventListener('click', () => { reShuffleEvent(reShuffle) }, false);
}

