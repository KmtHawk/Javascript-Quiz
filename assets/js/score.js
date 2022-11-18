function printHighscores() {
    let highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];

    highscores.sort(function (a, b) {
        return b.score - a.score;
    });

    for (let x = 0; x < highscores.length; x += 1) {
        let tag = document.createElement('li');
        tag.textContent = highscores[x].initials + ' _ ' + highscores[x].score;

        let theOl = document.querySelector('#highscores');
        theOl.appendChild(tag)
    }
}

function clearScores() {
    window.localStorage.removeItem('highscores');
    window.location.reload();
}

document.querySelector('#remove').addEventListener('click', clearScores);

printHighscores();