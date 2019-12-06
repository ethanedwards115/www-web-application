//sets interval of slides
var slides = document.querySelectorAll('#slides .slide');
var showingSlide = 0;
var slideInterval = setInterval(nextSlide,2000);

//transistions between slides
function nextSlide() {
    slides[showingSlide].className = 'slide';
    showingSlide = (showingSlide+1)%slides.length;
    slides[showingSlide].className = 'slide showing';
}
