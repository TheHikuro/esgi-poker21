import { user } from "./user/index.js";
import { game, navbar } from "./game/index.js";

user.init();
navbar.init();
window.document.getElementById('newGame').addEventListener('click', game.start , false);