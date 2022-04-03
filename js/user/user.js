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

const options = () => {
    const soundOn = func.createHtmlElement('img', 'soundOn', ['soundOn'])
    const soundOff = func.createHtmlElement('img', 'soundOff', ['soundOff'])

    soundOn.src = '../assets/img/soundOn.png';
    soundOff.src = '../assets/img/soundOff.png';
}

// Init user, set username, set logout button
const init = () => {
    const myUsername = window.document.getElementById('username');
    myUsername.innerHTML = localStorage.getItem('username');
    myUsername.addEventListener('click', logout);
    myUsername.onmouseover = () => {
        myUsername.innerHTML = 'Logout 🏃‍♂️';
        myUsername.onmouseleave = () => {
            myUsername.innerHTML = localStorage.getItem('username');
        }
    }
    options();
}

// Logout user
const logout = () => {
    window.location.href = '../index.html';
}

export { init }