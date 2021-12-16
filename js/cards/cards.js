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

const checkDeck = async(myDeck, deckCount, deckPile, deckFromHtml, reShuffle) => {
    const { remaining } = await getDeckInfo(myDeck);
    if (myDeck && remaining >= 0) {
        deckCount.innerHTML = remaining;
    }
    if (remaining > 0) {
        deckPile.src = '../assets/img/back_deck.png';
        deckFromHtml.appendChild(deckPile);
    } else if (remaining === 0) {
        deckPile.remove();
        deckCount.innerHTML = '0';
        reShuffle.innerHTML = 'Re-shuffle';
        deckFromHtml.appendChild(reShuffle);
    }
}

const deckPileEvent = async (myDeck, deckCount, deckPile, deckFromHtml, reShuffle) => {
    await drawCardFromDeck(myDeck, 1);
    await checkDeck(myDeck, deckCount, deckPile, deckFromHtml, reShuffle);
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

    const deckPile = window.document.createElement('img');
    const reShuffle = window.document.createElement('button');
    
    checkDeck(myDeck, deckCount, deckPile, deckFromHtml, reShuffle)

    deckPile.addEventListener('click', () => { deckPileEvent(myDeck, deckCount, deckPile, deckFromHtml, reShuffle) }, false);
    reShuffle.addEventListener('click', () => { reShuffleEvent(reShuffle) }, false);
}

