let currentQuestionsIndex = 0;
let time = questions.length * 15;
let timerId;

let questionsEl = document.querySelector('#questions');
let timerEl = document.querySelector('#time');
let choicesEl = document.querySelector('#options');
let submitBtn = document.querySelector('#submit');
let startBtn = document.querySelector('#quiz')
let initialsEl = document.querySelector('#initials');
let feedback = document.querySelector('#feedback');

function startQuiz() {
    let startScreen = document.querySelector('#start');
    startScreen.setAttribute('class', 'hide');

    questionsEl.removeAttribute('class');

    timerId = setInterval(clockTick, 1000);

    timerEl.textContent = time;

    getQuestions();
}

function getQuestions() {
    let currentQuestion = questions[currentQuestionsIndex];

    let titleEl = document.querySelector('#question-title');
    titleEl.textContent = currentQuestion.title;

    choicesEl.innerHTML = " ";
    for (let x = 0; x < currentQuestion.choices.length; x++) {
        let choice = currentQuestion.choices[x];
        let chiceNode = document.createElement('button');
        chiceNode.setAttribute('class', 'option');
        chiceNode.setAttribute('vaue', choice);

        chiceNode.textContent = x + 1 + '. ' + choice;

        choicesEl.appendChild(chiceNode);

    }
}

function questionClick(event) {
    let buttonEl = event.target;

    if (!buttonEl.matches('.option')) {
        return;
    }

    if (buttonEl.value == questions[currentQuestionsIndex].answer) {
        time -= 15;
        
        if (time < 0) {
            time = 0;
        }

        timerEl.textContent = time;
        
        feedback.textContent = 'wrong';
    } else {
        feedback.textContent = 'Correct';
    }

    feedback.setAttribute('class', 'feedback');
    setTimeout(function () {
      feedback.setAttribute('class', 'feedback hide');
    }, 1000);
  

    currentQuestionsIndex++;

    if (time <=0 || currentQuestionsIndex ===  questions.length) {
        quizEnd();
    } else {
        getQuestions();
    }
}

function quizEnd() {
    clearInterval(timerId);

    let screenEnd = document.querySelector('#end');
    screenEnd.removeAttribute("class");

    let finalScore = document.querySelector('#final');
    finalScore.textContent = time;

    questionsEl.setAttribute('class', 'hide');
}

function clockTick() {
    time--;
    timerEl.textContent = time;

    if (time <= 0) {
        quizEnd();
    }
}

function saveHighscore() {
    let initials = initialsEl.value.trim();

    if (initials !== '') {
        let highscores =
        JSON.parse(window.localStorage.getItem('highscores')) || [];

        let newScore = {
            score: time,
            initials: initials,
        };

        highscores.push(newScore);
        window.localStorage.setItem('highscores', JSON.stringify(highscores));
        window.location.href = 'highscore.html';
    }
}

function checkForEnter(event) {
    if (event.key === 'Enter') {
        saveHighscore();
    }
}

submitBtn.addEventListener('click', saveHighscore)

startBtn.addEventListener('click', startQuiz) 

choicesEl.addEventListener('click', questionClick)

initialsEl.addEventListener('keyup', checkForEnter)