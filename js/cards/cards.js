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

const displayDeck = async (myDeck, deckFromHtml, deckCount) => {
    getDeckInfo(myDeck).then(data => {
        const deckPile = window.document.createElement('img');
        const reShuffle = window.document.createElement('button');

        deckPile.src = '../assets/img/back_deck.png';
        deckFromHtml.appendChild(deckPile);
        deckCount.innerHTML = data.remaining;
        
        deckPile.addEventListener('click', async () => {
            await drawCardFromDeck(myDeck, 1);
            getDeckInfo(myDeck).then(datas => {
                if (myDeck && datas.remaining >= 0) {
                    deckCount.innerHTML = datas.remaining;
                }
                if (datas.remaining > 0) {
                    deckPile.src = '../assets/img/back_deck.png';
                    deckFromHtml.appendChild(deckPile);
                } else if (datas.remaining === 0) {
                    deckPile.remove();
                    deckCount.innerHTML = '0';
                    reShuffle.innerHTML = 'Re-shuffle';
                    deckFromHtml.appendChild(reShuffle);
                    reShuffle.addEventListener('click', () => {
                        // myDeck = getDeck();
                        // displayDeck(myDeck, deckFromHtml, deckCount);
                    })
                }
            })
        })
    });
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

    await displayDeck(myDeck, deckFromHtml, deckCount);
}

