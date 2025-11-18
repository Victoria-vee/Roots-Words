const englishWord = document.querySelector('.english');
const igboWord = document.querySelector('.igbo');
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.igbo').forEach(igbo => {
    igbo.addEventListener('click', () => {
      const english = igbo.parentElement.querySelector('.english');
      if (!english) return;
      // toggle visibility
      english.style.display = english.style.display === 'block' ? 'none' : 'block';
      igbo.classList.toggle('clicked');
    });
  });
});
