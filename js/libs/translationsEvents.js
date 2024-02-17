window.addEventListener('DOMContentLoaded', async () => {
    try {
        const language = window.navigator.userLanguage || window.navigator.language;
        const lang = language.includes('es') ? "es-sv/min" : language.includes('zh') ? 'zh-zh/min' : "en-us/min";
        const langLoc = "../js/data/translations/";

        const data = await fetchData(`${langLoc}${lang}/seenOn.json`);
        loadSeenOn(data);
    } catch (e) {
        console.error(e);
    }
});

function loadSeenOn(seenOnList) {
    const defTxt = 'contest-';
    const { seenOn } = seenOnList;

    const fragment = document.createDocumentFragment();
    seenOn.forEach((item, index) => {
        const active = index === 0 ? " active" : "";

        const seenOnDiv = document.createElement('div');
        seenOnDiv.className = `carousel-item col-md-3${active}`;
        seenOnDiv.innerHTML = `<div class="panel panel-default">
                                    <div class="panel-thumbnail">
                                        <a target="_blank" href="https://${item.link}" class="thumb">
                                            <picture>
                                                <source srcset="../img/events/${defTxt}${item.image}.webp" type="image/webp">
                                                <source srcset="../img/events/${defTxt}${item.image}.png" type="image/png">
                                                <img src="../img/events/${defTxt}${item.image}.png" alt="${item.title}" class="img-fluid mx-auto d-block">
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