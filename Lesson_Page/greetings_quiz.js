const quizData = [
    {
        question: "What does 'Ndewo' mean?",
        options: ["Goodbye", "Hello", "Thank you", "Please"],
        correct: 1
    },
    {
        question: "How do you say 'Good morning' in Igbo?",
        options: ["Ehihie ọma", "Mgbede ọma", "Ụtụtụ ọma", "Ndewo"],
        correct: 2
    },
    {
        question: "What does 'Ehihie ọma' mean?",
        options: ["Good afternoon", "Good evening", "Good night", "Hello"],
        correct: 0
    },
    {
        question: "What is 'Mgbede ọma' in English?",
        options: ["Good morning", "Good afternoon", "Good evening", "How are you?"],
        correct: 2
    },
    {
        question: "Which Igbo phrase asks 'How are you?'",
        options: ["Kedu?", "Ndewo", "Adị m mma", "Nnọọ"],
        correct: 0
    },
    {
        question: "How do you respond 'I'm fine' in Igbo?",
        options: ["Adị m mma", "Kedu?", "Ndewo", "Daalu"],
        correct: 0
    },
    {
        question: "Translate: 'Ndewo, kedu ka ị mere?'",
        options: ["Hello, how are you doing?","Good morning, did you sleep well?","Good afternoon, how is your afternoon?","Welcome! Come in."],
        correct: 0
    },
    {
        question: "Which phrase would you use to welcome someone?",
        options: ["Nnọọ! Bịakwa n'ụlọ anyị.", "Daalu maka enyemaka gị.", "Kedu? Ị dị mma?", "Ehihie ọma"],
        correct: 0
    },
    {
        question: "What does 'Daalu' mean?",
        options: ["Please", "Thank you", "Yes", "No"],
        correct: 1
    },
    {
        question: "Which is a correct greeting sentence in Igbo?",
        options: ["Ndewo, Aha m bu Onyinye", "Ana m eri ji", "Nwanne m nwoke nọ n'ụlọ", "Ulo ahu bu nnukwu ulo"],
        correct: 0
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
    localStorage.setItem('greetingsQuizScore', percentage.toFixed(0));

    buttons.innerHTML = `<button onclick="restartQuiz()">Retake Quiz</button><a href="greetings.html" style="text-decoration: none;"><button>Back to Lesson</button></a>`;
    
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
