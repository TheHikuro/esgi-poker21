switch (window.location.pathname) {
    case '/html/game-page.html':
        if (localStorage.getItem('username') === null) {
            window.location.href = '../index.html';
        }
        break;
    default:
        break;
}

export const username = () => {
    const myUsername = window.document.getElementById('username');
    const myNewUsername = window.document.createElement('span');
    myNewUsername.innerHTML = localStorage.getItem('username');
    myUsername.appendChild(myNewUsername);
}

export const logout = () => {
    localStorage.removeItem('username');
    window.location.href = '../index.html';
}

window.username = username
window.logout = logout