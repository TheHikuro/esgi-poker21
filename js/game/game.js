import { showDeck, clearAllDecks } from "../cards/index.js";
import { navbar } from "./index.js"

// Add start EventListener
const init = () => {
    window.document.getElementById('newGame').addEventListener('click', start , false);
}

// Launch game and update navbar buttons
const start = async () => {
    window.document.getElementById('newGame').removeEventListener('click', start, false);
    navbar.buttonHideById('newGame', true);
    navbar.buttonHideById('stopGame', false);
    window.document.getElementById('stopGame').addEventListener('click', stop, false);
    showDeck();
}

// Stop game and update navbar buttons
const stop = async () => {
    window.document.getElementById('shuffleDeck').removeEventListener('click', shuffle, false);
    window.document.getElementById('stopGame').removeEventListener('click', stop, false);
    navbar.buttonHideById('stopGame', true);
    navbar.buttonDisabledById('shuffleDeck', true);
    navbar.buttonHideById('newGame', false);
    window.document.getElementById('newGame').addEventListener('click', start, false);
    await clearAllDecks();
}

// Restart game
const restart = async () => {
    window.document.getElementById('newGame').removeEventListener('click', restart, false);
    await stop();
    await start();
}

// Shuffle deck
const shuffle = async () => {
    window.document.getElementById('shuffleDeck').removeEventListener('click', shuffle, false);
    navbar.buttonDisabledById('shuffleDeck', true);
    console.log('shuffle animation :)');
    //await shuffle animation
    navbar.buttonDisabledById('shuffleDeck', false);
    window.document.getElementById('shuffleDeck').addEventListener('click', shuffle, false);
}

export { init, start, stop, restart, shuffle }