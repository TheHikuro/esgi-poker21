const buttons = {
    navbar: [
        {
            value: 'New Game',
            id: 'newGame',
            class: 'btn',
            rules: {
                disabled: false,
                hide: false
            }
        },
        {
            value: 'Stop Game',
            id: 'stopGame',
            class: 'btn',
            rules: {
                disabled: false,
                hide: true
            }
        },
        {
            value: 'Shuffle Deck',
            id: 'shuffleDeck',
            class: 'btn',
            rules: {
                disabled: true,
                hide: false
            }
        }
    ]
}

// return navbar buttons json
const navbar = () => {
    return buttons.navbar;
}

export { navbar }