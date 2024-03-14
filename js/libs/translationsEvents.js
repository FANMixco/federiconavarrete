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
        const uLang = (window.navigator.userLanguage || window.navigator.language).split('-')[0];
        const lang = (['en', 'es'].indexOf(uLang) === 1) ? uLang : 'en';

        const data = await fetchData(`../js/i18n/${lang}/seenOn.json`);
        loadSeenOn(data);
    } catch (e) {
        console.error(e);
    }

    $('#eventsCarousel').on('slide.bs.carousel', function (e) {
        const itemsPerSlide = 4;
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

function loadSeenOn(seenOnList) {
    const urlI = '../img/events/';
    const defTxt = 'contest-';
    const { seenOn } = seenOnList;

    const fragment = document.createDocumentFragment();
    const total = seenOn.length / 4;
    seenOn.forEach((item, index) => {
        const active = index === 0 ? " active" : "";
        const lazyLoaded = (index < total) ? "" : "loading='lazy'";

        const seenOnDiv = document.createElement('div');
        seenOnDiv.className = `carousel-item col-md-3${active}`;
        seenOnDiv.innerHTML = `<div class="panel panel-default"><div class="panel-thumbnail"><a target="_blank" href="https://${item.link}" class="thumb"><picture><source srcset="${urlI}${defTxt}${item.image}.webp" type="image/webp"><source srcset="${urlI}${defTxt}${item.image}.png" type="image/png"><img src="${urlI}${defTxt}${item.image}.png" ${lazyLoaded} alt="${item.title}" class="img-fluid mx-auto d-block"></picture></a></div></div>`;

        fragment.appendChild(seenOnDiv);
    });

    const divEvents = document.getElementById('divEvents');
    divEvents.innerHTML = ''; // Clear previous content
    divEvents.appendChild(fragment);
}