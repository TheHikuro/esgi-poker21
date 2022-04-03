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
            value: 'Shuffle',
            id: 'shuffleDeck',
            class: 'btn',
            rules: {
                disabled: true,
                hide: false
            }
        }, {
            value: 'Leaderboard',
            id: 'btn-modalLead',
            class: 'btn',
            rules: {
                disabled: true,
                hide: true
            }
        }
    ],
    player: [
        {
            value: 'Stand',
            id: 'playerStand',
            class: 'btn',
            rules: {
                disabled: false,
                hide: true
            } 
        },
        {
            value: 'Next Round',
            id: 'nextRound',
            class: 'btn',
            rules: {
                disabled: true,
                hide: true
            } 
        }    
    ]
}

// return navbar buttons json
const navbar = () => {
    return buttons.navbar;
}

const player = () => {
    return buttons.player;
}

export { navbar, player }