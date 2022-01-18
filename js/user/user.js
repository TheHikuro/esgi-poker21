import { func } from '../generic/index.js';

switch (window.location.pathname) {
    case '/html/game-page.html':
        if (localStorage.getItem('username') === null) {
            window.location.href = '../index.html';
        }
        break;
    default:
        break;
}

// Init user, set username, set logout button
const init = () => {
    const myUsername = window.document.getElementById('username');
    const myNewUsername = func.createHtmlElement('span');
    myUsername.parentNode.addEventListener('click', logout, false);
    myNewUsername.innerHTML = localStorage.getItem('username');
    myUsername.appendChild(myNewUsername);
}

// Logout user
const logout = () => {
    localStorage.removeItem('username');
    window.location.href = '../index.html';
}

export { init, logout}