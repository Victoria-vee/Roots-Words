const quizData = [
    {
        question: "What does 'Nne' mean?",
        options: ["Mother", "Father", "Sister", "Brother"],
        correct: 0
    },
    {
        question: "What does 'Nna' mean?",
        options: ["Mother", "Father", "Siblings", "Friend"],
        correct: 1
    },
    {
        question: "What is 'Ụmụnna' in English?",
        options: ["Mother", "Brother", "Siblings", "House"],
        correct: 2
    },
    {
        question: "How do you say 'Sister' in Igbo?",
        options: ["Nwanne m nwaanyị", "Nwanne m nwoke", "Nne", "Nna"],
        correct: 0
    },
    {
        question: "How do you say 'Brother' in Igbo?",
        options: ["Nwanne m nwoke", "Nwanne m nwaanyị", "Ụmụnna", "Nna"],
        correct: 0
    },
    {
        question: "'Nne m dị mma.' means?",
        options: ["My mother is fine", "My father is fine", "My sister is fine", "My brother is fine"],
        correct: 0
    },
    {
        question: "'Nna m na-arụ ọrụ.' means?",
        options: ["My brother works", "My father works", "My mother works", "My sister works"],
        correct: 1
    },
    {
        question: "'Nwanne m nwaanyị bụ ezigbo enyi m.' means?",
        options: ["My sister is a good friend", "My brother is at home", "My mother is fine", "My father works"],
        correct: 0
    },
    {
        question: "'Nwanne m nwoke nọ n'\u1eb9\u1eb9.' means?",
        options: ["My sister is at home", "My brother is at home", "My siblings are at home", "My father is at home"],
        correct: 1
    },
    {
        question: "Which Igbo word refers to family members collectively?",
        options: ["Nne", "Nna", "Ụmụnna", "Nwanne"],
        correct: 2
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
    localStorage.setItem('familyQuizScore', percentage.toFixed(0));

    buttons.innerHTML = `<button onclick="restartQuiz()">Retake Quiz</button><a href="family.html" style="text-decoration: none;"><button>Back to Lesson</button></a>`;
    
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
