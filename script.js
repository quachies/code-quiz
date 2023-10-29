let questEl = document.getElementById("question");
let opEl = document.getElementById("options");
let resultEl = document.getElementById("results");
let scoreEl = document.getElementById("score");
let timerEl = document.getElementById("timer");

let questions = [
    {
        question: "question 1",
        option: [
            { text: "A", correct: false },
            { text: "A", correct: false },
            { text: "A", correct: false },
            { text: "A", correct: true }
        ]
    },
    {
        question: "question 2",
        option: [
            { text: "A", correct: false },
            { text: "A", correct: true },
            { text: "A", correct: false },
            { text: "A", correct: false }
        ]
    },
    {
        question: "question 3",
        option: [
            { text: "A", correct: false },
            { text: "A", correct: true },
            { text: "A", correct: false },
            { text: "A", correct: false }
        ]
    },
    {
        question: "question 4",
        option: [
            { text: "A", correct: false },
            { text: "A", correct: false },
            { text: "A", correct: true },
            { text: "A", correct: false }
        ]
    },
    {
        question: "question 5",
        option: [
            { text: "A", correct: false },
            { text: "A", correct: false },
            { text: "A", correct: false },
            { text: "A", correct: true }
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
        setTimeout(showNextQuestion, 1000)
        score++
        scoreEl.textContent = score
        if (currentQuestionIndex === questions.length - 1) { endQuiz() }
    } else{
        resultEl.textContent = "incorrect (-5s)"
        timeLeft -= 5
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

