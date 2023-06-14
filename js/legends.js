window.addEventListener('DOMContentLoaded', function (event) {
  var legendsCarousel = document.getElementById('legendsCarousel');
  legendsCarousel.addEventListener('slide.bs.carousel', function (e) {
    var relatedTarget = e.relatedTarget;
    var index = Array.from(relatedTarget.parentNode.children).indexOf(relatedTarget);
    var itemsPerSlide = 3;
    var totalItems = document.getElementsByClassName('carousel-item').length;

    if (index >= totalItems - (itemsPerSlide - 1)) {
      var it = itemsPerSlide - (totalItems - index);
      var carouselItems = document.getElementsByClassName('carousel-item');

      for (var i = 0; i < it; i++) {
        // append slides to end
        if (e.direction == "left") {
          carouselItems[i].parentNode.appendChild(carouselItems[i]);
        } else {
          legendsCarousel.querySelector('.carousel-inner').appendChild(carouselItems[0]);
        }
      }
    }
  });

  var carousels = document.querySelectorAll('.carousel');
  carousels.forEach(function (carousel) {
    carousel.addEventListener('touchstart', function (event) {
      var xClick = event.touches[0].pageX;
      carousel.addEventListener('touchmove', function (event) {
        var xMove = event.touches[0].pageX;
        if (Math.floor(xClick - xMove) > 5) {
          carousel.carousel('next');
        } else if (Math.floor(xClick - xMove) < -5) {
          carousel.carousel('prev');
        }
      });
      carousel.addEventListener('touchend', function () {
        carousel.removeEventListener('touchmove');
      });
    });
  });
});
