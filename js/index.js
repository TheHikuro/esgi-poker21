
const valueFromForm = window.document.getElementById('FormUsername');

// Set username form, add username to localstorage
valueFromForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = window.document.getElementById('username');
    localStorage.setItem('username', username.value);
    username.innerHTML = ''
    if (localStorage.getItem('username') !== null) {
        window.location.href = '../html/game-page.html';
    }
});



