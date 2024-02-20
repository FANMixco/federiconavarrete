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

    $('#legendsCarousel').on('slide.bs.carousel', function (e) {
        let $e = $(e.relatedTarget);
        let idx = $e.index();
        let itemsPerSlide = 3;
        let totalItems = $('.carousel-item').length;
        
        if (idx >= totalItems - (itemsPerSlide - 1)) {
            let it = itemsPerSlide - (totalItems - idx);
            for (let i = 0; i < it; i++) {
                // append slides to end
                if (e.direction == "left") {
                    $('.carousel-item').eq(i).appendTo('.carousel-inner');
                }
                else {
                    $('.carousel-item').eq(0).appendTo('.carousel-inner');
                }
            }
        }
    });
  
    $(".carousel").on("touchstart", function(event){
        let xClick = event.originalEvent.touches[0].pageX;
        $(this).one("touchmove", function(event) {
            let xMove = event.originalEvent.touches[0].pageX;
            if (Math.floor(xClick - xMove) > 5) {
                $(".carousel").carousel('next');
            }
            else if( Math.floor(xClick - xMove) < -5) {
                $(".carousel").carousel('prev');
            }
        });
        $(".carousel").on("touchend", function() {
            $(this).off("touchmove");
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