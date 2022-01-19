import { deck } from '../deck/index.js';
import { user } from '../user/index.js'
import { func } from '../generic/index.js';
import { navbar } from './index.js'

const newGameElement = func.getDynamicElementById('newGame');
const stopGameElement = func.getDynamicElementById('stopGame');
const shuffleElement = func.getDynamicElementById('shuffleDeck');

// Add start EventListener
const init = () => {
    user.init();
    navbar.init();
    newGameElement().addEventListener('click', start , { once: true });
}

// Launch game and update navbar buttons
const start = async () => {
    func.hideElementById('newGame', true);
    func.hideElementById('stopGame', false);
    deck.init();
    stopGameElement().addEventListener('click', stop, { once: true });
}

// Stop game and update navbar buttons
const stop = async () => {
    shuffleElement().removeEventListener('click', shuffle);
    deck.stop();
    func.hideElementById('stopGame', true);
    func.disabledElementById('shuffleDeck', true);
    func.hideElementById('newGame', false);
    newGameElement().addEventListener('click', reset, { once: true });
}

// Restart game
const restart = async () => {
    newGameElement().removeEventListener('click', restart);
    await stop();
}

// Restore deck on new game
const reset = async () => {
    deck.reset();
    func.hideElementById('newGame', true);
    func.hideElementById('stopGame', false);
    stopGameElement().addEventListener('click', stop, { once: true });
}

// Shuffle deck
const shuffle = async () => {
    shuffleElement().removeEventListener('click', shuffle);
    func.disabledElementById('shuffleDeck', true);
    console.log('shuffle animation :)');
    //await shuffle animation
    func.disabledElementById('shuffleDeck', false);
    shuffleElement().addEventListener('click', shuffle);
}

export { init, start, stop, restart, reset, shuffle }