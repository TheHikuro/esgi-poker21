
const valueFromForm = window.document.getElementById('FormUsername');

// Set username form, add username to localstorage
valueFromForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = window.document.getElementById('username');
    if(username.value !== localStorage.getItem('username')){
        localStorage.clear();
        localStorage.setItem('username', username.value);
    }
    username.innerHTML = ''
    window.location.href = '../html/game-page.html';
});



