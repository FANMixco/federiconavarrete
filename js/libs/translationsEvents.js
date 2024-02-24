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
        const lang = language.includes('es') ? "es-sv/min" : language.includes('zh') ? 'zh-zh/min' : "en-us/min";

        const data = await fetchData(`../js/data/translations/${lang}/seenOn.json`);
        loadSeenOn(data);
    } catch (e) {
        console.error(e);
    }

    $('#eventsCarousel').on('slide.bs.carousel', function (e) {
        let $e = $(e.relatedTarget);
        let idx = $e.index();
        let itemsPerSlide = 4;
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
});

function loadSeenOn(seenOnList) {
    const defTxt = 'contest-';
    const { seenOn } = seenOnList;

    const fragment = document.createDocumentFragment();
    seenOn.forEach((item, index) => {
        const active = index === 0 ? " active" : "";
        const loc = 'https://fanmixco.sirv.com/';

        const seenOnDiv = document.createElement('div');
        seenOnDiv.className = `carousel-item col-md-3${active}`;
        seenOnDiv.innerHTML = `<div class="panel panel-default">
                                    <div class="panel-thumbnail">
                                        <a target="_blank" href="https://${item.link}" class="thumb">
                                            <picture>
                                                <source srcset="${loc}/img/events/${defTxt}${item.image}.webp" type="image/webp">
                                                <source srcset="${loc}/img/events/${defTxt}${item.image}.png" type="image/png">
                                                <img src="${loc}/img/events/${defTxt}${item.image}.png" alt="${item.title}" class="img-fluid mx-auto d-block">
                                            </picture>
                                        </a>
                                    </div>
                                </div>`;

        fragment.appendChild(seenOnDiv);
    });

    const divEvents = document.getElementById('divEvents');
    divEvents.innerHTML = ''; // Clear previous content
    divEvents.appendChild(fragment);
}