//sets interval of slides
var slides = document.querySelectorAll('#slides .slide');
var showingSlide = 0;
var slideInterval = setInterval(nextSlide,2000);

//transistions between slides
function nextSlide() {
    slides[showingSlide].className = 'slide p-3 d-none';
    showingSlide = (showingSlide+1)%slides.length;
    slides[showingSlide].className = 'slide p-3 d-block';
}

function loadBasket() {

  var basket = localStorage.getItem('basket');

  if (basket === null) {
    basket = {
      products: []
    };
  } else {
    basket = JSON.parse(basket);
  }

  return basket;
}

function countBasketItems() {
  var basket = loadBasket();

  var basketCounters = document.getElementsByClassName('basket-counter');

  for (var i = 0; i < basketCounters.length; i++) {

    basketCounters[i].innerHTML = `${basket.products.length}`
  }
}

window.onload = countBasketItems();
