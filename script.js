let questEl = document.getElementById("question");
let opEl = document.getElementById("options");
let resultEl = document.getElementById("results");
let scoreEl = document.getElementById("score");
let timerEl = document.getElementById("timer");
let playerEl = document.getElementById("players")
let startButton = document.getElementById("start-button")
let resetButton = document.getElementById("reset-button")

let questions = [
    {
        question: "Commonly used data types do not include:",
        option: [
            { text: "strings", correct: false },
            { text: "booleans", correct: false },
            { text: "numbers", correct: false },
            { text: "alerts", correct: true }
        ]
    },
    {
        question: "The condition in an if / else statement is enclosed within __.",
        option: [
            { text: "quotes", correct: false },
            { text: "parentheses", correct: true },
            { text: "curly brackets", correct: false },
            { text: "square brackets", correct: false }
        ]
    },
    {
        question: "Arrays in Javascript can be used to store",
        option: [
            { text: "numbers and strings", correct: false },
            { text: "booleans", correct: false },
            { text: "other arrays", correct: false },
            { text: "all the above", correct: true }
        ]
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        option: [
            { text: "JavaScript", correct: false },
            { text: "terminal/bash", correct: false },
            { text: "for loops", correct: false },
            { text: "console.log", correct: true }
        ]
    },
    {
        question: "What element is used for displaying images on a web page?",
        option: [
            { text: "<img>", correct: true },
            { text: "<div>", correct: false },
            { text: "<body>", correct: false },
            { text: "<nav>", correct: false }
        ]
    },
]

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;

function showQuestion() {
    let currentQuestion = questions[currentQuestionIndex]
    questEl.textContent = currentQuestion.question
    opEl.innerHTML = ""
    currentQuestion.option.forEach((option, index) => {
        let optionButton = document.createElement("button")
        optionButton.textContent = option.text
        optionButton.classList.add("option")
        optionButton.addEventListener("click", () => checkAnswer(option.correct))
        opEl.appendChild(optionButton)
        resultEl.textContent = ""
    })

}

function showNextQuestion() {
    currentQuestionIndex++
    if (currentQuestionIndex < questions.length) {
        showQuestion()
    }
}

function checkAnswer(isCorrect) {
    if (isCorrect) {
        resultEl.textContent = "correct"
        setTimeout(showNextQuestion, 500)
        score++
        scoreEl.textContent = "Current score: " + score
        if (currentQuestionIndex === questions.length - 1) { endQuiz() }
    } else{
        resultEl.textContent = "incorrect (-5s)"
        timeLeft -= 5
        setTimeout(showNextQuestion, 500)
        if (currentQuestionIndex === questions.length - 1) { endQuiz() }
    }
}

function startQuiz() {
    timerInterval = setInterval(timer, 1000)
    questEl.textContent
    showQuestion()
}

function timer() {
    if (timeLeft <= 0) {
        endQuiz()
    }
    timeLeft --;
    timerEl.textContent = "Time Left " + timeLeft + "s" 
}

function endQuiz() {
    let highscore = JSON.parse(localStorage.getItem("player")) || {}
    clearInterval(timerInterval)
    timerEl.textContent = "Game Over" 
    let initial = prompt("input initials, score: " + score)
    highscore[initial] = score
    localStorage.setItem("player", JSON.stringify(highscore))
    playerEl.textContent = "HighScores: " + localStorage.getItem("player")
}

function resetQuiz() {
    clearInterval(timerInterval)
    timeLeft = 60
    timerEl.textContent = "Time Left " + timeLeft + "s"
    window.location.reload()
}

startButton.addEventListener("click", startQuiz);
resetButton.addEventListener("click", resetQuiz);

