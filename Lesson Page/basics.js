document.querySelectorAll(".words").forEach(phrase => {
    const igbo = phrase.querySelector(".igbo");
    const english = phrase.querySelector(".english");

    phrase.addEventListener("click", () => {
        // Toggle Igbo styling
        igbo.classList.toggle("clicked");

        // Toggle English visibility
        english.style.display =
            english.style.display === "block" ? "none" : "block";
    });
});


const savedScore = localStorage.getItem('basicsQuizScore');
if (savedScore) {
    document.querySelector('.score-badge').textContent = savedScore + '%';
    if (savedScore >= 80) {
        document.querySelector('.score-badge').classList.add('excellent');
    } else if (savedScore >= 50) {
        document.querySelector('.score-badge').classList.add('good');
    } else {
        document.querySelector('.score-badge').classList.add('poor');
    }
}