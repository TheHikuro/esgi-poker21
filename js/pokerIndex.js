import { username } from "./user/index.mjs";
import { game, navbar } from "./game/index.js";

localStorage.removeItem('deckId');
username();
navbar.init();
window.document.getElementById('newGame').addEventListener('click', game.start , false);