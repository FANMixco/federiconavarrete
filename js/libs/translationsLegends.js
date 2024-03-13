async function fetchData(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const language = window.navigator.userLanguage || window.navigator.language;
        const lang = language.includes('es') ? "es-sv/min" : "en-us/min";

        const data = await fetchData(`../js/i18n/${lang}/legendsList.json`);
        loadLegends(data.legendsList);
    } catch (e) {
        console.error(e);
    }

    $('#legendsCarousel').on('slide.bs.carousel', function (e) {
        const itemsPerSlide = 3;
        const cItem = '.carousel-item';
        let $e = $(e.relatedTarget);
        let idx = $e.index();
        let totalItems = $(cItem).length;
        
        if (idx >= totalItems - (itemsPerSlide - 1)) {
            let it = itemsPerSlide - (totalItems - idx);
            for (let i = 0; i < it; i++) {
                // append slides to end
                $(cItem).eq(e.direction == "left" ? i : 0).appendTo('.carousel-inner');
            }
        }
    });
});

function loadLegends(legendsList) {
  const urlI = '../img/legends/';
  const fragment = document.createDocumentFragment();
  const lazyLoaded = "loading='lazy'";

  legendsList.forEach((item) => {
      const active = item.isActive ? " active" : "";

      const legendDiv = document.createElement('div');
      legendDiv.className = `carousel-item col-md-4${active}`;
      legendDiv.innerHTML = `<div class="card"><div class="img-thumbnail"><a class="text-warning legend-link" target="_blank" href="https://${item.link}"><picture><source srcset="${urlI}${item.img}.webp" type="image/webp"><source srcset="${urlI}${item.img}.jpg" type="image/jpeg"><img src="${urlI}${item.img}.jpg" ${lazyLoaded} alt="${item.title}" class="cards-row"></picture><div class="caption"><p><b>${item.title}</b></p></div></a></div></div>`;
      fragment.appendChild(legendDiv);
  });

  document.getElementById('divLegends').appendChild(fragment);
}