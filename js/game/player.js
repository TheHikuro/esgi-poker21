import { func } from '../generic/index.js';
import { buttons } from './index.js';
 
const playerButtonsElement = document.querySelector('.player-buttons');

// Init navbar buttons
const init = () => {
    buttons.player().forEach(btn => {
        const btnHtmlElement = func.createHtmlElement('button', btn.id, [btn.class]);
        btnHtmlElement.innerHTML = btn.value;
        playerButtonsElement.appendChild(btnHtmlElement);
        func.hideElementById(btn.id, btn.rules.hide);
        func.disabledElementById(btn.id, btn.rules.disabled);
    })
}

export { init }