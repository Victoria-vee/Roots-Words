document.addEventListener('DOMContentLoaded', () => {
  // Toggle English translation when Igbo word is clicked
  document.querySelectorAll('.igbo').forEach(igbo => {
    igbo.addEventListener('click', () => {
      const english = igbo.parentElement.querySelector('.english');
      if (!english) return;
      english.style.display = english.style.display === 'block' ? 'none' : 'block';
      igbo.classList.toggle('clicked');
    });
  });

  // Audio play/pause for letters and words
  // Behavior:
  // - Each `.letter` may have up to two <audio> tags: letter audio (first) and word audio (second).
  // - Clicking the play icon (.audio i) plays/pauses the letter audio.
  // - Clicking the volume icon (.word-example i.fa-volume-high) plays/pauses the word audio.
  // - Starting one audio stops any other currently playing audio and resets its icon.

  let currentAudio = null;
  let currentIcon = null;

  function stopCurrent() {
    if (currentAudio) {
      currentAudio.pause();
      try { currentAudio.currentTime = 0; } catch (e) {}
    }
    if (currentIcon) {
      // Reset icon back to original state
      if (currentIcon.dataset.type === 'letter') {
        currentIcon.classList.remove('fa-circle-pause');
        currentIcon.classList.add('fa-circle-play');
      } else if (currentIcon.dataset.type === 'word') {
        currentIcon.classList.remove('fa-circle-pause');
        currentIcon.classList.add('fa-volume-high');
      }
    }
    currentAudio = null;
    currentIcon = null;
  }

  function toggleIconPlaying(iconEl, playing, type) {
    if (!iconEl) return;
    if (type === 'letter') {
      if (playing) {
        iconEl.classList.remove('fa-circle-play');
        iconEl.classList.add('fa-circle-pause');
      } else {
        iconEl.classList.remove('fa-circle-pause');
        iconEl.classList.add('fa-circle-play');
      }
    } else if (type === 'word') {
      if (playing) {
        iconEl.classList.remove('fa-volume-high');
        iconEl.classList.add('fa-circle-pause');
      } else {
        iconEl.classList.remove('fa-circle-pause');
        iconEl.classList.add('fa-volume-high');
      }
    }
  }

  document.querySelectorAll('.letter').forEach(letter => {
    const audios = Array.from(letter.querySelectorAll('audio'));
    const letterAudio = audios[0] || null;
    const wordAudio = audios[1] || null;

    const playIcon = letter.querySelector('.audio i');
    const volumeIcon = letter.querySelector('.word-example i.fa-volume-high');

    if (playIcon && letterAudio) {
      playIcon.style.cursor = 'pointer';
      playIcon.dataset.type = 'letter';
      playIcon.addEventListener('click', () => {
        if (currentAudio && currentAudio !== letterAudio) stopCurrent();

        if (letterAudio.paused) {
          letterAudio.play();
          toggleIconPlaying(playIcon, true, 'letter');
          currentAudio = letterAudio;
          currentIcon = playIcon;
          letterAudio.onended = () => { toggleIconPlaying(playIcon, false, 'letter'); currentAudio = null; currentIcon = null; };
        } else {
          letterAudio.pause();
          toggleIconPlaying(playIcon, false, 'letter');
          currentAudio = null;
          currentIcon = null;
        }
      });
    }

    if (volumeIcon && wordAudio) {
      volumeIcon.style.cursor = 'pointer';
      volumeIcon.dataset.type = 'word';
      volumeIcon.addEventListener('click', () => {
        if (currentAudio && currentAudio !== wordAudio) stopCurrent();

        if (wordAudio.paused) {
          wordAudio.play();
          toggleIconPlaying(volumeIcon, true, 'word');
          currentAudio = wordAudio;
          currentIcon = volumeIcon;
          wordAudio.onended = () => { toggleIconPlaying(volumeIcon, false, 'word'); currentAudio = null; currentIcon = null; };
        } else {
          wordAudio.pause();
          toggleIconPlaying(volumeIcon, false, 'word');
          currentAudio = null;
          currentIcon = null;
        }
      });
    }
  });

});