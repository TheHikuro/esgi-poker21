import { createElement } from "../cards/generic/index.js";

const buttons = [
    {
        value: 'New Game',
        id: 'newGame',
        class: 'btn',
        rules: {
            disabled: false,
            hide: false
        }
    },
    {
        value: 'Stop Game',
        id: 'stopGame',
        class: 'btn',
        rules: {
            disabled: false,
            hide: true
        }
    },
    {
        value: 'Shuffle Deck',
        id: 'shuffleDeck',
        class: 'btn',
        rules: {
            disabled: true,
            hide: false
        }
    }
]
 
const navbarHtmlElement = document.querySelector('.actions');

const init = async () => {
    buttons.forEach(btn => {
        const btnHtmlElement = createElement('button', btn.id, [btn.class]);
        btnHtmlElement.innerHTML = btn.value;
        btnHtmlElement.style.display = btn.rules.hide ? 'none' : null;
        btnHtmlElement.disabled = btn.rules.disabled;
        navbarHtmlElement.appendChild(btnHtmlElement);
    })
}

const buttonDisabledById = async (id, disabled) => {
    document.getElementById(id).disabled = disabled;
}

const buttonHideById = async (id, hide) => {
    document.getElementById(id).style.display = hide ? 'none' : null;
}

export { init, buttonDisabledById, buttonHideById }