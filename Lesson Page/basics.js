const englishWord = document.querySelector('.english');
const igboWord = document.querySelector('.igbo');
document.querySelectorAll('.igbo').forEach(item => {
    item.addEventListener('click', function() {
        if (englishWord) {
            englishWord.classList.toggle('english');
        }
          if (igboWord) {
            igboWord.classList.toggle('clicked');
        }
    });
});