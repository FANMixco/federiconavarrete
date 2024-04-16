async function fetchData(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (e) {
        console.error(e);
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const lang = new URL(window.location.href).searchParams.get("lang"),
            data = await fetchData(`../js/i18n/${lang ? lang : 'en'}/books.json`);

        loadBooks(data.booksList);
    } catch (e) {
        console.error(e);
    }

    function loadBooks(booksList) {
        const urlI = '../img/books/',
            fragment = document.createDocumentFragment(),
            lazyLoaded = "loading='lazy'";

        booksList.forEach((item) => {
            const active = item.isActive ? " active" : "",
                bookDiv = document.createElement('div');

            bookDiv.className = `carousel-item col-12 col-sm-6 col-md-4 col-lg-2${active}`;
            bookDiv.innerHTML = `<a target="_blank" href="https://${item.link}"><picture><source srcset="${urlI}${item.img}.webp" type="image/webp"><source srcset="${urlI}${item.img}.jpg" type="image/jpeg"><img class="img-fluid mx-auto d-block" ${lazyLoaded} src="${urlI}${item.img}.jpg" alt="${item.title}"></picture></a>`;
            fragment.appendChild(bookDiv);
        });

        $('#divBooks').append(fragment);

        $('#booksCarousel').on('slide.bs.carousel', (e) => {
            /*
                CC 2.0 License Iatek LLC 2018
                Attribution required
            */
            const itemsPerSlide = 7,
                cItem = '.carousel-item',
                $e = $(e.relatedTarget),
                totalItems = $(cItem).length;

            let idx = $e.index();

            if (idx >= totalItems - (itemsPerSlide - 1)) {
                let it = itemsPerSlide - (totalItems - idx);
                for (let i = 0; i < it; i++) {
                    // append slides to end
                    $(cItem).eq(e.direction == "left" ? i : 0).appendTo('.carousel-inner');
                }
            }
        });
    }
});