import { deck } from '../deck/index.js';
import { user } from '../user/index.js'
import { func, modalWin } from '../generic/index.js';
import { navbar, player } from './index.js'
import { leaderboard } from "../leaderboard/index.js";
import { vibration } from "../api/index.js";
import { api } from '../api/index.js';

const newGameElement = func.getDynamicElementById('newGame');
const stopGameElement = func.getDynamicElementById('stopGame');
const shuffleElement = func.getDynamicElementById('shuffleDeck');
const modalElement = func.getDynamicElementById('modalTest');
const playerStandElement = func.getDynamicElementById('playerStand');
const newRoundElement = func.getDynamicElementById('nextRound');

// Add start EventListener
const init = async () => {
    if(func.haveDeckId() && localStorage.getItem('gameState')){
        await loadSave();
    }
    else{
        user.init();
        navbar.init();
        player.init();
        leaderboard.init();
        newGameElement().addEventListener('click', start , { once: true });
        modalElement().addEventListener('click', () => {
            modalWin();
        });
    }
}

// Launch game and update navbar buttons
const start = async () => {
  localStorage.removeItem("deckId");
  localStorage.setItem("playerTurn", false);
  func.hideElementById("newGame", true);
  func.hideElementById("stopGame", false);
  func.disabledElementById("stopGame", true);
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

    const score_win = localStorage.getItem("nbWin");
    const score_black_jack = localStorage.getItem("nbBlackJackWin");
    const score_loose = localStorage.getItem("nbLoose");

    localStorage.clear();
    localStorage.setItem('username', username);
    localStorage.setItem("nbWin", score_win);
    localStorage.setItem("nbBlackJackWin", score_black_jack);
    localStorage.setItem("nbLoose", score_loose);
    
    deck.reset();
    func.hideElementById('newGame', true);
    func.hideElementById('stopGame', false);
    func.disabledElementById('stopGame', true);
    func.hideElementById('playerStand', true);
    func.disabledElementById('playerStand', false);
}

const newRound = async () => {
    localStorage.removeItem('roundEnd');
    localStorage.removeItem('playerStand');
    localStorage.removeItem('dealerStand');
    localStorage.removeItem('dealerScore');
    localStorage.removeItem('playerScore');
    func.disabledElementById('nextRound', true);
    func.hideElementById('nextRound', true);
    func.disabledElementById('playerStand', false);
    func.hideElementById('playerStand', true);
    deck.reset();
    save();
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

        if(!newGameElement().disabled){
            newGameElement().addEventListener('click', reset, { once: true }); 
        }
        if(!stopGameElement().disabled){
            stopGameElement().addEventListener('click', stop, { once: true }); 
        }
        if(!shuffleElement().disabled){
            shuffleElement().addEventListener('click', shuffle, { once: true }); 
        }
        if(!modalElement().disabled){
            modalElement().addEventListener('click', modalWin, { once: true }); 
        }
        if(!newRoundElement().disabled){
            newRoundElement().addEventListener('click', newRound, { once: true }); 
        }

        if(!playerStandElement().disabled && JSON.parse(localStorage.getItem('playerStand')) != true && JSON.parse(localStorage.getItem('roundEnd')) != true){
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

const scoreTrigger = async () => {
    const dealerScore = JSON.parse(localStorage.getItem('dealerScore'));
    const playerScore = JSON.parse(localStorage.getItem('playerScore'));
    const playerStand = JSON.parse(localStorage.getItem('playerStand'));
    const dealerStand = JSON.parse(localStorage.getItem('dealerStand'));
    const playerTurn = JSON.parse(localStorage.getItem('playerTurn'));

    if(playerScore > 21 && playerTurn === true || dealerScore > playerScore && dealerScore <= 21 && playerStand === true && dealerStand == true){
        playerStandElement().removeEventListener('click', deck.playerStand);
        localStorage.setItem('roundEnd', true);

        //set le nombre de loose en local
        localStorage.setItem(
          "nbLoose",
          JSON.parse(localStorage.getItem("nbLoose")) + 1
        );

        vibration.vibrationLose();
        if(playerScore > 21 && playerTurn === true){
            api.drawCardFromDeck(localStorage.getItem('deckId'), 1);
        }

        alert('loose 😒');

        leaderboard.getLooseResult(playerScore, dealerScore);
    }
    else if((dealerScore > 21 || playerScore > dealerScore) && playerStand === true && dealerStand === true){
      localStorage.setItem("roundEnd", true);

      //set le nombre de win en local
      localStorage.setItem(
        "nbWin",
        JSON.parse(localStorage.getItem("nbWin")) + 1
      );

      vibration.vibrationWin();
      alert("win 😊");

      leaderboard.getWinResult(playerScore, dealerScore);
    }
    else if(playerScore === 21){
      playerStandElement().removeEventListener("click", deck.playerStand);
      localStorage.setItem("roundEnd", true);

      //set le nombre de win en local
      localStorage.setItem(
        "nbBlackJackWin",
        JSON.parse(localStorage.getItem("nbBlackJackWin")) + 1
      );

      vibration.vibrationWin();
      alert("blackjack 🃏");

      leaderboard.getBlackJackResult();
    }

    if(JSON.parse(localStorage.getItem('roundEnd')) === true){
        func.disabledElementById('playerStand', true);
        const { remaining } = await deck.getDeckInfo();
        if(remaining > 3){
            newRoundElement().addEventListener('click', newRound, { once: true });
            func.hideElementById('nextRound', false);
            func.disabledElementById('nextRound', false)
        }
        else{
            alert('game end !');
            localStorage.setItem('gameEnd', true);
            deck.checkDeck();
        }
        save();
    }
}

export { init, start, stop, restart, reset, save, loadSave, shuffle, scoreTrigger }