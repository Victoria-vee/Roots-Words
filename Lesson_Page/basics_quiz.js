const quizData = [
    {
        question: "What does 'Ndewo' mean?",
        options: ["Thank you", "Hello", "Please", "Yes"],
        correct: 1
    },
    {
        question: "How do you say 'Thank you' in Igbo?",
        options: ["Ndewo", "Daalụ", "Biko", "Ee"],
        correct: 1
    },
    {
        question: "What is 'Biko' in English?",
        options: ["Yes", "Please", "Hello", "Thank you"],
        correct: 1
    },
    {
        question: "What does 'Ee' mean?",
        options: ["No", "Please", "Yes", "Thank you"],
        correct: 2
    },
    {
        question: "How do you greet someone in Igbo and ask for their name?",
        options: ["Ndewo, Kedu aha gi?", "O bu nwa agbogho", "Mba, Aha ya bu Chinedu", "Mmiri ahu bu oku"],
        correct: 0
    },
    {
        question: "What does 'O bu nwa agbogho' mean?",
        options: ["She is a girl", "He is a boy", "That is big", "The water is hot"],
        correct: 0
    },
    {
        question: "What does 'Mba' mean?",
        options: ["Yes", "No", "Maybe", "Please"],
        correct: 1
    },
    {
        question: "How do you say 'That house is big' in Igbo?",
        options: ["Ulo ahu bu nnukwu ulo", "Mmiri ahu bu oku", "Ndewo, Aha m bu Onyinye", "O bu nwa agbogho"],
        correct: 0
    },
    {
        question: "What does 'Mmiri ahu bu oku' mean?",
        options: ["That house is big", "The water is hot", "She is a girl", "His name is Chinedu"],
        correct: 1
    },
    {
        question: "What is the correct greeting response with your name?",
        options: ["Mba, Aha ya bu Chinedu", "Ndewo, Aha m bu Onyinye", "O bu nwa agbogho", "Ee"],
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
        // document.getElementById('result-message').textContent = '✓ Correct!';
        correctAudio.currentTime = 0;
        correctAudio.play().catch(() => {});
        document.getElementById('result-message').className = 'result-message correct';
        score++;
    } else {
        options[index].classList.add('incorrect');
        options[question.correct].classList.add('correct');
        // document.getElementById('result-message').innerHTML = '<i class="fa-solid fa-square-xmark"></i> Incorrect!';
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
    localStorage.setItem('basicsQuizScore', percentage.toFixed(0));

    buttons.innerHTML = `<button onclick="restartQuiz()">Retake Quiz</button><a href="basics.html" style="text-decoration: none;"><button>Back to Lesson</button></a>`;

    
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