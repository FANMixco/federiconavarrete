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

        const data = await fetchData(`../js/i18n/${lang}/booksList.json`);
        loadBooks(data.booksList);
    } catch (e) {
        console.error(e);
    }
});

function loadBooks(booksList) {
    const urlI = '../img/books/';
    const fragment = document.createDocumentFragment();
    const lazyLoaded = "loading='lazy'";

    booksList.forEach((item) => {
        const active = item.isActive ? " active" : "";

        const bookDiv = document.createElement('div');
        bookDiv.className = `carousel-item col-12 col-sm-6 col-md-4 col-lg-2${active}`;
        bookDiv.innerHTML = `<a target="_blank" href="https://${item.link}"><picture><source srcset="${urlI}${item.img}.webp" type="image/webp"><source srcset="${urlI}${item.img}.jpg" type="image/jpeg"><img class="img-fluid mx-auto d-block" ${lazyLoaded} src="${urlI}${item.img}.jpg" alt="${item.title}"></picture></a>`;
        fragment.appendChild(bookDiv);
    });

    document.getElementById('divBooks').appendChild(fragment);

    $('#booksCarousel').on('slide.bs.carousel', function (e) {
        /*
            CC 2.0 License Iatek LLC 2018
            Attribution required
        */
        let $e = $(e.relatedTarget);
        let idx = $e.index();
        let itemsPerSlide = 7;
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
}