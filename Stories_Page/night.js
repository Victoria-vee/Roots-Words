// Language toggle (show/hide English, highlight Igbo)
const langIcons = document.querySelectorAll(".lang-icon");

langIcons.forEach(icon => {
  icon.addEventListener("click", () => {
    const sentence = icon.closest(".sentence");
    const igboText = sentence.querySelector(".igbo");
    const englishText = sentence.querySelector(".english");

    igboText.classList.toggle("clicked");
    if (englishText.style.display === "block") {
      englishText.style.display = "none";
    } else {
      englishText.style.display = "block";
    }
  });
});

// Audio play/pause for each sentence
const playIcons = document.querySelectorAll(".fa-play");
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
  icon.addEventListener('click', () => {
    const sentence = icon.closest('.sentence');
    // Use inline audio element inside the sentence
    let audio = sentence.querySelector('audio');

    if (!audio) return; // nothing to play

    // If this icon's audio is already playing, stop it
    if (currentAudio === audio) {
      stopCurrentAudio();
      return;
    }

    // Stop any other playing audio first
    stopCurrentAudio();

    currentAudio = audio;
    currentPlayingIcon = icon;
    icon.classList.add('playing');
    audio.play();

    audio.addEventListener('ended', () => {
      if (currentPlayingIcon) currentPlayingIcon.classList.remove('playing');
      currentAudio = null;
      currentPlayingIcon = null;
    });
  });
});
