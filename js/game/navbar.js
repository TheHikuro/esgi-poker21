import { func } from '../generic/index.js';
import { buttons } from './index.js';
 
const navbarHtmlElement = document.querySelector('.actions');

// Init navbar buttons
const init = () => {
    buttons.navbar().forEach(btn => {
        const btnHtmlElement = func.createHtmlElement('button', btn.id, [btn.class]);
        btnHtmlElement.innerHTML = btn.value;
        navbarHtmlElement.appendChild(btnHtmlElement);
        func.hideElementById(btn.id, btn.rules.hide);
        func.disabledElementById(btn.id, btn.rules.disabled);
    })
}

export { init }