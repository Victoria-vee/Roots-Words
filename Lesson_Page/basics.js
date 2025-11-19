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

// Audio play/pause for play icons (single-active audio, icon toggle)
const playIcons = document.querySelectorAll('.fa-play');
let currentAudio = null;
let currentPlayingIcon = null;

function stopCurrentAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        if (currentPlayingIcon) currentPlayingIcon.classList.remove('playing');
        currentAudio = null;
        currentPlayingIcon = null;
    }
}

playIcons.forEach(icon => {
    icon.addEventListener('click', (e) => {
        // Prevent triggering the parent "words" click handler
        e.stopPropagation();

        // Find nearest container that may hold an audio element
        const container = icon.closest('.phrase, .sentences, .sentence');
        const audio = container ? container.querySelector('audio') : null;

        if (!audio) return; // nothing to play

        // If this audio is already playing, stop it
        if (currentAudio === audio) {
            stopCurrentAudio();
            return;
        }

        // Stop other audio first
        stopCurrentAudio();

        currentAudio = audio;
        currentPlayingIcon = icon;
        icon.classList.add('playing');
        audio.play();

        audio.addEventListener('ended', () => {
            if (currentPlayingIcon) currentPlayingIcon.classList.remove('playing');
            currentAudio = null;
            currentPlayingIcon = null;
        }, { once: true });
    });
});