import { createElement } from "../cards/generic/index.js";
import { buttons } from "./index.js"
 
const navbarHtmlElement = document.querySelector('.actions');

const init = async () => {
    buttons.navbar().forEach(btn => {
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