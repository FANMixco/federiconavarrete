window.addEventListener('DOMContentLoaded', async () => {
    try {
        const language = window.navigator.userLanguage || window.navigator.language;
        const lang = language.includes('es') ? "es-sv/min" : "en-us/min";

        const data = await fetchData(`../js/data/translations/${lang}/legendsList.json`);
        loadLegends(data.legendsList);
    } catch (e) {
        console.error(e);
    }
});

function loadLegends(legendsList) {
    const urlI = '../img/legends/';
    const fragment = document.createDocumentFragment();

    legendsList.forEach((item) => {
        const active = item.isActive ? " active" : "";

        const legendDiv = document.createElement('div');
        legendDiv.className = `carousel-item col-md-4${active}`;
        legendDiv.innerHTML = `<div class="card">
                                    <div class="img-thumbnail">
                                        <a class="text-warning legend-link" target="_blank" href="https://${item.link}">
                                            <picture>
                                                <source srcset="${urlI}${item.img}.webp" type="image/webp">
                                                <source srcset="${urlI}${item.img}.jpg" type="image/jpeg">
                                                <img src="${urlI}${item.img}.jpg" alt="${item.title}" class="cards-row">
                                            </picture>
                                            <div class="caption">
                                                <p><b>${item.title}</b></p>
                                            </div>
                                        </a>
                                    </div>
                                </div>`;
        fragment.appendChild(legendDiv);
    });

    document.getElementById('divLegends').appendChild(fragment);
}