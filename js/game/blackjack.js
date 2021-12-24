import { showDeck } from "../cards/index.js";
import { createElement, navbar } from "../cards/generic/index.js";

export const initGame = async () => {
    navbar();
    showDeck();
}