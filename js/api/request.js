export const getDeck = async () => {
    return await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1&jokers_enabled=false').then(response => response.json()).then(data => {
        const deckId = data.deck_id;
        localStorage.setItem('deckId', deckId);
        return deckId;
    })
}

export const getDeckInfo = async (deck_id) => {
    return await fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/`).then(response => response.json()).then(data => {
        return data;
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
