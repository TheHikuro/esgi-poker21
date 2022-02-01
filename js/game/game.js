import { deck } from '../deck/index.js';
import { user } from '../user/index.js'
import { func, modalWin } from '../generic/index.js';
import { navbar, player } from './index.js'

const newGameElement = func.getDynamicElementById('newGame');
const stopGameElement = func.getDynamicElementById('stopGame');
const shuffleElement = func.getDynamicElementById('shuffleDeck');
const modalElement = func.getDynamicElementById('modalTest');
const playerStandElement = func.getDynamicElementById('playerStand');

// Add start EventListener
const init = async () => {
    if(func.haveDeckId() && localStorage.getItem('gameState')){
        await loadSave();
    }
    else{
        user.init();
        navbar.init();
        player.init();
        newGameElement().addEventListener('click', start , { once: true });
        modalElement().addEventListener('click', () => {
            modalWin();
        });
    }
}

// Launch game and update navbar buttons
const start = async () => {
    localStorage.removeItem('deckId');
    localStorage.setItem('playerTurn', false);
    func.hideElementById('newGame', true);
    func.hideElementById('stopGame', false);
    func.disabledElementById('stopGame', true);
    deck.init();
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
    const username = localStorage.getItem('username');
    localStorage.clear();
    localStorage.setItem('username', username);
    deck.reset();
    func.hideElementById('newGame', true);
    func.hideElementById('stopGame', false);
    func.disabledElementById('stopGame', true);
    func.hideElementById('playerStand', true);
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

        switch(false){
            case newGameElement().disabled:
                newGameElement().addEventListener('click', reset, { once: true });
            case stopGameElement().disabled:
                stopGameElement().addEventListener('click', stop, { once: true });
            case shuffleElement().disabled:
                shuffleElement().addEventListener('click', shuffle, { once: true });
            case modalElement().disabled:
                modalElement().addEventListener('click', modalWin)
        }

        if(!playerStandElement().disabled && JSON.parse(localStorage.getItem('playerStand')) != true && JSON.parse(localStorage.getItem('gameEnd')) != true){
            playerStandElement().addEventListener('click', deck.playerStand, { once: true });
        }
    }
}

// Shuffle deck
const shuffle = async () => {
    shuffleElement().removeEventListener('click', shuffle);
    func.disabledElementById('shuffleDeck', true);
    deck.shuffle();
    await func.sleep(750);
    func.disabledElementById('shuffleDeck', false);
    shuffleElement().addEventListener('click', shuffle);
}

const scoreTrigger = () => {
    const dealerScore = JSON.parse(localStorage.getItem('dealerScore'));
    const playerScore = JSON.parse(localStorage.getItem('playerScore'));
    const playerStand = JSON.parse(localStorage.getItem('playerStand'));
    const dealerStand = JSON.parse(localStorage.getItem('dealerStand'));
    const playerTurn = JSON.parse(localStorage.getItem('playerTurn'));

    if(playerScore > 21 && playerTurn === true || dealerScore > playerScore && dealerScore <= 21 && playerStand === true && dealerStand == true){
        playerStandElement().removeEventListener('click', deck.playerStand);
        localStorage.setItem('gameEnd', true);
        alert('loose 😒');
    }
    else if((dealerScore > 21 || playerScore > dealerScore) && playerStand === true && dealerStand === true){
        localStorage.setItem('gameEnd', true);
        alert('win 😊');
    }
    else if(playerScore === 21){
        playerStandElement().removeEventListener('click', deck.playerStand);
        localStorage.setItem('gameEnd', true);
        alert('blackjack 🃏')
    }
}

export { init, start, stop, restart, reset, save, loadSave, shuffle, scoreTrigger }