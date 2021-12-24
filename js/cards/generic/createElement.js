import { arrOfBtn } from "../../game/buttons.js";

export const createElement = (type, id, classNames) => {
    const element = window.document.createElement(type);
    if (id) {
        element.id = id;
    }
    if(classNames) {
        element.classList.add(...classNames);
    }
    return element;
}

export const navbar = async () => {
    const navbar = document.querySelector('.actions');
    arrOfBtn.forEach(btn => {
        switch (btn.name) {
            case 'Shuffle Deck':
                btn.action = () => {}
                break;
            case 'New Deck':
                btn.action = () => {
                    localStorage.removeItem('deckId');
                }
                break;
            default:
                break;
        }

        switch (btn.rules) {
            case { disabled: true, hide: false }:
                btn.action = () => {};
                break;
            case { disabled: false, hide: true }:
                btn.style.display = 'none';
                break;
            default:
                const btnElement = createElement('button', btn.name, [btn.class]);
                btnElement.innerHTML = btn.name;
                btnElement.addEventListener('click', btn.action, false);
                navbar.appendChild(btnElement);
                break;
        }
    })
}