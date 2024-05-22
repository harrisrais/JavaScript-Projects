let slideIndex = 1;

function showSlides(n) {
    let slides = document.getElementsByClassName("slides");
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

function changeSlide(n) {
    showSlides(slideIndex += n);
}

document.addEventListener("DOMContentLoaded", () => {
    showSlides(slideIndex);
});
