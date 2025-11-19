const quizData = [
    {
        question: "What does 'Ji' mean?",
        options: ["Yam", "Rice", "Beans", "Corn"],
        correct: 0
    },
    {
        question: "What is 'Akpụ' in English?",
        options: ["Cassava", "Bean cake", "Peppered peanut butter", "Yam"],
        correct: 0
    },
    {
        question: "What does 'Ose Oji' refer to?",
        options: ["Peppered peanut butter", "Corn porridge", "Roasted yam", "Bean cake"],
        correct: 0
    },
    {
        question: "What does 'Ọka' mean?",
        options: ["Yam", "Corn", "Cassava", "Egg"],
        correct: 1
    },
    {
        question: "What is 'Akara'?",
        options: ["Bean Cake", "Peppered peanut butter", "Yam", "Corn"],
        correct: 0
    },
    {
        question: "Translate: 'Ana m eri ji.'",
        options: ["I am eating yam.", "I like corn.", "He is cooking.", "We are learning."],
        correct: 0
    },
    {
        question: "Translate: 'Ọ dị ụtọ.'",
        options: ["It tastes good.", "It is hot.", "It is cold.", "It is finished."],
        correct: 0
    },
    {
        question: "Which phrase asks if someone wants food?",
        options: ["Ana m eri ji.", "Ị chọrọ nka nri?", "Ọ dị ụtọ.", "Biko, nye m akwa."],
        correct: 1
    },
    {
        question: "What does 'Biko, nye m akwa.' mean?",
        options: ["Please, give me the eggs.", "Please, give me water.", "Please, cook the yam.", "Please, close the door."],
        correct: 0
    },
    {
        question: "Which of these is a food item from the lesson?",
        options: ["Ndewo", "Ji", "Kedu", "Nwanne"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

function loadQuestion() {
    const quiz = document.getElementById('quiz-content');
    const buttons = document.getElementById('quiz-buttons');
    const progress = document.getElementById('progress');
    const resultMessage = document.getElementById('result-message');

    if (currentQuestion < quizData.length) {
        const question = quizData[currentQuestion];
        
        progress.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
        
        quiz.innerHTML = `<div class="quiz-question">${question.question}</div><div class="quiz-options" id="options-container"></div>`;
        
        const optionsContainer = document.getElementById('options-container');
        question.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';
            optionDiv.textContent = option;
            optionDiv.onclick = () => selectOption(index);
            optionsContainer.appendChild(optionDiv);
        });

        buttons.innerHTML = `<button onclick="nextQuestion()" id="next-btn" disabled>Next Question</button>`;
        resultMessage.textContent = '';
        answered = false;
    } else {
        showResults();
    }
}

function selectOption(index) {
    if (answered) return;

    const options = document.querySelectorAll('.option');
    const question = quizData[currentQuestion];
    const correctAudio = document.getElementById('correct-audio');
    const wrongAudio = document.getElementById('wrong-audio');
    options[index].classList.add('selected');
    
    if (correctAudio) { wrongAudio.pause(); wrongAudio.currentTime = 0; }
    if (wrongAudio) { correctAudio.pause(); correctAudio.currentTime = 0; }
    
    
    if (index === question.correct) {
        options[index].classList.add('correct');
        correctAudio.currentTime = 0;
        correctAudio.play().catch(() => {});
        document.getElementById('result-message').className = 'result-message correct';
        score++;
    } else {
        options[index].classList.add('incorrect');
        options[question.correct].classList.add('correct');
        wrongAudio.currentTime = 0;
        wrongAudio.play().catch(() => {});
        document.getElementById('result-message').className = 'result-message incorrect';
    }

    answered = true;
    document.getElementById('next-btn').disabled = false;
}

function nextQuestion() {
    currentQuestion++;
    loadQuestion();
}

function showResults() {
    const quiz = document.getElementById('quiz-content');
    const buttons = document.getElementById('quiz-buttons');
    const scoreDiv = document.getElementById('quiz-score');
    const progress = document.getElementById('progress');
    const scoreBadge = document.getElementById('score-badge');

    quiz.innerHTML = '';
    progress.innerHTML = '';
    const percentage = (score / quizData.length) * 100;
    scoreDiv.textContent = `Your answered ${score}/${quizData.length} You Scored: `;
    scoreBadge.textContent = `You scored ${percentage.toFixed(0)}%`;
    scoreDiv.style.display = 'block';
    scoreBadge.style.display = 'block';
    if (percentage >= 80) {
        scoreBadge.className = 'score-badge excellent';
    } else { if (percentage >= 50) {
        scoreBadge.className = 'score-badge good';
    } else {
        scoreBadge.className = 'score-badge poor';
    }}
    localStorage.setItem('foodQuizScore', percentage.toFixed(0));

    buttons.innerHTML = `<button onclick="restartQuiz()">Retake Quiz</button><a href="food.html" style="text-decoration: none;"><button>Back to Lesson</button></a>`;
    
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    answered = false;
    document.getElementById('quiz-score').style.display = 'none';
    loadQuestion();
}

// Load first question on page load
loadQuestion();
