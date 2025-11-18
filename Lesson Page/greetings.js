const icons = document.querySelectorAll(".fa-language");

icons.forEach(icon => {
  icon.addEventListener("click", () => {
    const sentence = icon.closest(".sentence");
    const igboText = sentence.querySelector(".igbo");
    const englishText = sentence.querySelector(".english");

    // Toggle igbo text highlight
    igboText.classList.toggle("clicked");
    // Toggle visibility
    if (englishText.style.display === "block") {
      englishText.style.display = "none";
    } else {
      englishText.style.display = "block";
    }
  });
});