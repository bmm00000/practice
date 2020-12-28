const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const images = document.querySelectorAll(".image");
let currentlySelected = 0;

prevButton.addEventListener("click", function() {
    images[currentlySelected].classList.remove("active");
    currentlySelected--;
    images[currentlySelected].classList.add("active");
    nextButton.disabled = false;

    if (currentlySelected === 0) {
        prevButton.disabled = true;
    }
});

nextButton.addEventListener("click", function() {
    images[currentlySelected].classList.remove("active");
    currentlySelected++;
    images[currentlySelected].classList.add("active");
    prevButton.disabled = false;

    if (currentlySelected + 1 === images.length) {
        nextButton.disabled = true;
    }
});