window.addEventListener('DOMContentLoaded', () => {
    let language = window.navigator.userLanguage || window.navigator.language;
    let lang = "en-us/min";
    
    if (language.includes('es'))
        lang = "es-sv/min";
    
    let langLoc = "../js/data/translations/";
    
    fetchData(`${langLoc}${lang}/booksList.json`) .then((data) => { 
        loadBooks(data.booksList); 
    }).catch((e) => { console.error(e); });
});

function loadBooks(booksList) {
    booksList.forEach(function(item) {
        const active = item.isActive ? " active" : "";
        const urlI = '../img/books/';

        const book = `<div class="carousel-item col-12 col-sm-6 col-md-4 col-lg-2${active}">
                    <a target="_blank" href="https://${item.link}">
                        <picture>
                            <source
                                srcset="${urlI}${item.img}.webp"
                                type="image/webp">
                            <source
                                srcset="${urlI}${item.img}.jpg"
                                type="image/jpeg">
                            <img class="img-fluid mx-auto d-block" src="${urlI}${item.img}" alt="${item.title}">
                        </picture>
                    </a>
            </div>`;

        document.getElementById('divBooks').innerHTML += book;
    });
}