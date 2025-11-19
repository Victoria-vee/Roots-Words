document.addEventListener('DOMContentLoaded', () => {
    // Make the toggles tolerant of HTML that doesn't include the `.igbo` class.
    document.querySelectorAll('.words').forEach(phrase => {
        // prefer an element with class 'igbo', otherwise fall back to the first h3
        const igbo = phrase.querySelector('.igbo') || phrase.querySelector('h3');
        const english = phrase.querySelector('.english');

        phrase.addEventListener('click', () => {
            // Toggle Igbo styling (if present)
            if (igbo) igbo.classList.toggle('clicked');

            // Toggle English visibility (if present)
            if (english) {
                english.style.display = english.style.display === 'block' ? 'none' : 'block';
            }
        });
    });

    // Show saved score (if any)
    const savedScore = localStorage.getItem('familyQuizScore');
    if (savedScore) {
        const badge = document.querySelector('.score-badge');
        if (badge) {
            badge.textContent = savedScore + '%';
            if (savedScore >= 80) {
                badge.classList.add('excellent');
            } else if (savedScore >= 50) {
                badge.classList.add('good');
            } else {
                badge.classList.add('poor');
            }
        }
    }
});