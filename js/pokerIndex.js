switch (window.location.pathname) {
    case '/html/game-page.html':
        if (localStorage.getItem('username') === null) {
            window.location.href = '../index.html';
        }
        break;
    default:
        break;
}

export const test = () => {
    const myTest = window.document.getElementById('test');
    const myNewTest = window.document.createElement('p');
    myNewTest.innerHTML = localStorage.getItem('username');
    myTest.appendChild(myNewTest);
}

export const logout = () => {
    localStorage.removeItem('username');
    window.location.href = '../index.html';
} 

test()

window.test = test
window.logout = logout