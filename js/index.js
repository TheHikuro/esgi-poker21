
const valueFromForm = window.document.getElementById('FormUsername');

// Set username form, add username to localstorage
valueFromForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = window.document.getElementById('username');
    if(username.value !== localStorage.getItem('username')){
        localStorage.clear();
        localStorage.setItem('username', username.value);

        //set score player
        localStorage.setItem("nbWin", 0);
        localStorage.setItem("nbBlackJackWin", 0);
        localStorage.setItem("nbLoose", 0);
    }
    username.innerHTML = ''
    window.location.href = '../html/game-page.html';
});



