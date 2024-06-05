/**
 * dark mood
 */
const darkMood = document.querySelector("[data-dark-mood]");
const lightMood = document.querySelector("[data-light-mood]");
const HTML = document.documentElement;

// localStorage
if (localStorage.length !== 0) {
    HTML.dataset.theme = localStorage.theme;
    lightMood.classList.add(localStorage.lightMood);
    darkMood.classList.add(localStorage.darkMood);
};

lightMood.addEventListener("click", () => {
    HTML.dataset.theme = "dark";
    lightMood.classList.add("active");
    darkMood.classList.add("active");

    localStorage.setItem("theme", "dark");
    localStorage.setItem("lightMood", "active");
    localStorage.setItem("darkMood", "active");
});

darkMood.addEventListener("click", () => {
    HTML.dataset.theme = "light";
    darkMood.classList.remove("active");
    lightMood.classList.remove("active");

    localStorage.setItem("theme", null);
    localStorage.setItem("lightMood", null);
    localStorage.setItem("darkMood", null);
});