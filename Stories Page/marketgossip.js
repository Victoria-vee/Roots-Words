const translations = {
    "Nne": "My Dear",
    "biko":"please",
    "gwa m": "tell me",
    "ihe mere": "what happened"
    
};
const textContainer = document.getElementById('second');
const translationBox = document.getElementById('translation-box');
const words = textContainer.innerText.split("");
textContainer.innerHTML = word
.map(word => '<span class="hover-word"> ${word}</span>')
.join("");
 function showTranslation(e, word) {
      const cleanWord = word.replace(/[^\wÀ-ú]/g, "");
      const translation = translations[cleanWord];
      if (translation) {
        translationBox.style.display = "block";
        translationBox.innerText = translation;

        // Adjust position for hover or touch
        const x = e.pageX || e.touches[0].pageX;
        const y = e.pageY || e.touches[0].pageY;

        translationBox.style.left = x + "px";
        translationBox.style.top = (y - 40) + "px";
      }
    }

    function hideTranslation() {
      translationBox.style.display = "none";
    }

    wordElements.forEach(wordElem => {
      // Desktop hover
      wordElem.addEventListener("mouseover", (e) => showTranslation(e, wordElem.innerText));
      wordElem.addEventListener("mouseout", hideTranslation);

      // Mobile tap
      wordElem.addEventListener("touchstart", (e) => {
        e.preventDefault();
        showTranslation(e, wordElem.innerText);
      });
      wordElem.addEventListener("touchend", hideTranslation);
    });