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
}