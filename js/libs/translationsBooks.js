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

        const data = await fetchData(`../js/data/translations/${lang}/booksList.json`);
        loadBooks(data.booksList);
    } catch (e) {
        console.error(e);
    }
});

function loadBooks(booksList) {
    const urlI = '../img/books/';
    const fragment = document.createDocumentFragment();

    booksList.forEach((item) => {
        const active = item.isActive ? " active" : "";

        const bookDiv = document.createElement('div');
        bookDiv.className = `carousel-item col-12 col-sm-6 col-md-4 col-lg-2${active}`;
        bookDiv.innerHTML = `<a target="_blank" href="https://${item.link}">
                                <picture>
                                    <source srcset="${urlI}${item.img}.webp" type="image/webp">
                                    <source srcset="${urlI}${item.img}.jpg" type="image/jpeg">
                                    <img class="img-fluid mx-auto d-block" src="${urlI}${item.img}.jpg" alt="${item.title}">
                                </picture>
                            </a>`;
        fragment.appendChild(bookDiv);
    });

    document.getElementById('divBooks').appendChild(fragment);

    $('#booksCarousel').on('slide.bs.carousel', function (e) {
        /*
            CC 2.0 License Iatek LLC 2018
            Attribution required
        */
        var $e = $(e.relatedTarget);
        var idx = $e.index();
        var itemsPerSlide = 7;
        var totalItems = $('.carousel-item').length;
        
        if (idx >= totalItems-(itemsPerSlide-1)) {
            var it = itemsPerSlide - (totalItems - idx);
            for (var i=0; i<it; i++) {
                // append slides to end
                if (e.direction=="left") {
                    $('.carousel-item').eq(i).appendTo('.carousel-inner');
                }
                else {
                    $('.carousel-item').eq(0).appendTo('.carousel-inner');
                }
            }
        }
    });
}