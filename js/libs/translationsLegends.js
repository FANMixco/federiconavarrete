window.addEventListener('DOMContentLoaded', (event) => {
    let language = window.navigator.userLanguage || window.navigator.language;
    let lang = "en-us/min";
    
    if (language.includes('es'))
        lang = "es-sv/min";
    
    let langLoc = "../js/data/translations/";
    
    getScript(`${langLoc}${lang}/legendsList.js`) .then(() => { loadLegends(); }).catch((e) => { console.error(e); });
});

function loadLegends() {
    legendsList.forEach(item => {
        const active = item.isActive ? " active" : "";

        const legend = `<div class="carousel-item col-md-4${active}">
            <div class="card">
            <div class="img-thumbnail">
                <a class="text-warning" target="_blank" href="${item.link}">
                    <picture>
                        <source
                            srcset="${item.img.replace(".jpg", ".webp")}"
                            type="image/webp">
                        <source
                            srcset="${item.img}" 
                            type="image/jpeg">
                        <img src="${item.img}" alt="${item.title}" class="cards-row">
                    </picture>
                    <div class="caption">
                        <p>${item.title}</p>
                    </div>
                </a>
            </div>
            </div>
        </div>`;

        document.getElementById('divLegends').innerHTML += legend;
    });
}