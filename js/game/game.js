import { deck } from '../deck/index.js';
import { user } from '../user/index.js'
import { func, modalWin } from '../generic/index.js';
import { navbar } from './index.js'

const newGameElement = func.getDynamicElementById('newGame');
const stopGameElement = func.getDynamicElementById('stopGame');
const shuffleElement = func.getDynamicElementById('shuffleDeck');
const modalElement = func.getDynamicElementById('modalTest');


// Add start EventListener
const init = async () => {
    if(func.haveDeckId() && localStorage.getItem('gameState')){
        await loadSave();
    }
    else{
        user.init();
        navbar.init();
        newGameElement().addEventListener('click', start , { once: true });
        modalElement().addEventListener('click', () => {
            modalWin();
        });
    }
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
    save();
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

// Save Game state
const save = () => {
    localStorage.setItem('gameState', window.document.body.outerHTML);
}

// Load html state page
const loadSave = async () => {
    if(localStorage.getItem('gameState')){
        window.document.body.outerHTML =  localStorage.getItem('gameState');
        window.document.getElementById('deck').innerHTML = null;
        await func.sleep(250);
        window.document.getElementById('username').parentNode.addEventListener('click', user.logout, false);
        await deck.init();
        await deck.loadEventsListener();

        switch(false){
            case newGameElement().disabled:
                newGameElement().addEventListener('click', reset, { onece: true });
            case stopGameElement().disabled:
                stopGameElement().addEventListener('click', stop, { onece: true });
            case shuffleElement().disabled:
                shuffleElement().addEventListener('click', shuffle, { onece: true });
        }
    }
}

// Shuffle deck
const shuffle = async () => {
    shuffleElement().removeEventListener('click', shuffle);
    func.disabledElementById('shuffleDeck', true);
    await deck.shuffle();
    //await shuffle animation
    func.disabledElementById('shuffleDeck', false);
    shuffleElement().addEventListener('click', shuffle);
}

export { init, start, stop, restart, reset, save, loadSave, shuffle }