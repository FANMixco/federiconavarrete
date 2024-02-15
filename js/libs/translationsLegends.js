window.addEventListener('DOMContentLoaded', () => {
    let language = window.navigator.userLanguage || window.navigator.language;
    let lang = "en-us/min";
    
    if (language.includes('es'))
        lang = "es-sv/min";
    
    let langLoc = "../js/data/translations/";
    
    fetchData(`${langLoc}${lang}/legendsList.json`) .then((data) => {
        loadLegends(data.legendsList); 
    }).catch((e) => { console.error(e); });
});

function loadLegends(legendsList) {
    legendsList.forEach(item => {
        const active = item.isActive ? " active" : "";
        const urlI = '../img/legends/';

        const legend = `<div class="carousel-item col-md-4${active}">
            <div class="card">
            <div class="img-thumbnail">
                <a class="text-warning legend-link" target="_blank" href="https://${item.link}">
                    <picture>
                        <source
                            srcset="${urlI}${item.img}.webp"
                            type="image/webp">
                        <source
                            srcset="${urlI}${item.img}.jpg"
                            type="image/jpeg">
                        <img src="${urlI}${item.img}.jpg" alt="${item.title}" class="cards-row">
                    </picture>
                    <div class="caption">
                        <p><b>${item.title}</b></p>
                    </div>
                </a>
            </div>
            </div>
        </div>`;

        document.getElementById('divLegends').innerHTML += legend;
    });
}