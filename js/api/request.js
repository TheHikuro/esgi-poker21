const apiBaseUrl = 'https://deckofcardsapi.com/api/deck';

// Get new deck and add it's id to localStorage
const getDeck = async () => {
    return await fetch(`${apiBaseUrl}/new/shuffle/?deck_count=1&jokers_enabled=false`).then(response => response.json()).then(data => {
        const deckId = data.deck_id;
        localStorage.setItem('deckId', deckId);
        return deckId;
    })
}

// Get all infos from current deck
const getDeckInfo = async (deck_id) => {
    return await fetch(`${apiBaseUrl}/${deck_id}/`).then(response => response.json()).then(data => {
        return data;
    });
}

// Draw card from current deck
const drawCardFromDeck = async (deck_id, number_cards) => {
    const arr = [];
    await fetch(`${apiBaseUrl}/${deck_id}/draw/?count=${number_cards}`).then(response => response.json()).then(data => {
        for (let i = 0; i < data.cards.length; i++) {
            arr.push(data.cards[i]);
        }
    })
    return arr;
}

export { getDeck, getDeckInfo, drawCardFromDeck }