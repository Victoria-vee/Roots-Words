const close= document.getElementById('close');
const infocontainer = document.getElementById('info-container');
const lesson= document.getElementById('lesson');
const startlesson = document.getElementById('startlesson');
const greetings = document.getElementById('greetings');
const closeqna = document.getElementById('closeqna');
close.onclick = () => {
    infocontainer.style.display = "none";
}

lesson.onclick = () => {
    infocontainer.style.display = "block";
}

startlesson.onclick = () => {
    greetings.style.display = "block";
    infocontainer.style.display = "none";
}

closeqna.onclick = () => {
    greetings.style.display = "none";
}

const next = document.getElementById('continue');
const question = document.getElementById('question');
const option1 = document.getElementById('1');
const option2 = document.getElementById('2');
const option3 = document.getElementById('3');
const option4 = document.getElementById('4');
const correct = document.getElementById('correct');

option1.onclick = () => {
    correct.classList.add("correct");
    correct.style.display = "block";
}
next.onclick = () => {
    correct.classList.remove("correct");
    correct.style.display = "none";
        question.innerHTML = "What is the largest planet in our solar system?";
        option1.innerHTML = "Earth";
        option2.innerHTML = "Jupiter";
        option3.innerHTML = "Mars";
        option4.innerHTML = "Saturn";
        


    }


