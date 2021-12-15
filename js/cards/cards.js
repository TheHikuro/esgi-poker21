/**
 * @function
 * @description This function is used to create a new card.
 */
export const getDeck = async () => {
    await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').then(response => response.json()).then(data => {
        const deckId = data.deck_id;
        localStorage.setItem('deckId', deckId);
    })
}

export const getCardsFromDeck = async (deck_id) => {
    const arr = [];
    await fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=2`).then(response => response.json()).then(data => {
        for (let i = 0; i < data.cards.length; i++) {
            arr.push(data.cards[i]);
        }
    })
    return arr;
}

const getDeckInfo = (deck_id) => {
    return fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/`).then(response => response.json()).then(data => {
        return data;
    });
}

export const showDeck = () => {
    const deckFromHtml = window.document.getElementById('deck');
    const myDeck = localStorage.getItem('deckId');
    const deckCount = window.document.getElementById('deck-count');

    deckCount.innerHTML = getDeckInfo(myDeck).then(data => {
        const deckPile = window.document.createElement('img');
        const reShuffle = window.document.createElement('button');

        deckCount.innerHTML = data.remaining;
        
        if (myDeck && data.remaining > 0) {
            deckPile.src = '../assets/img/back_deck.png';
            deckFromHtml.appendChild(deckPile);
        } else if (myDeck && test === 0) {
            reShuffle.innerHTML = 'Re-Shuffle';
            deckFromHtml.appendChild(reShuffle);
            reShuffle.addEventListener('click', () => {
                getDeck();
            });
        }
    });
}
