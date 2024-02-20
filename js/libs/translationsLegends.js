async function fetchData(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error('Error loading JSON:', error);
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const language = window.navigator.userLanguage || window.navigator.language;
        const lang = language.includes('es') ? "es-sv/min" : "en-us/min";

        const data = await fetchData(`../js/data/translations/${lang}/legendsList.json`);
        loadLegends(data.legendsList);
    } catch (e) {
        console.error(e);
    }

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

function loadLegends(legendsList) {
    const urlI = '../img/legends/';
    const fragment = document.createDocumentFragment();

    legendsList.forEach((item) => {
        const active = item.isActive ? " active" : "";

        const legendDiv = document.createElement('div');
        legendDiv.className = `carousel-item col-md-4${active}`;
        legendDiv.innerHTML = `<div class="card">
                                    <div class="img-thumbnail">
                                        <a class="text-warning legend-link" target="_blank" href="https://${item.link}">
                                            <picture>
                                                <source srcset="${urlI}${item.img}.webp" type="image/webp">
                                                <source srcset="${urlI}${item.img}.jpg" type="image/jpeg">
                                                <img src="${urlI}${item.img}.jpg" alt="${item.title}" class="cards-row">
                                            </picture>
                                            <div class="caption">
                                                <p><b>${item.title}</b></p>
                                            </div>
                                        </a>
                                    </div>
                                </div>`;
        fragment.appendChild(legendDiv);
    });

    document.getElementById('divLegends').appendChild(fragment);
}