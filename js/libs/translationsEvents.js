window.addEventListener('DOMContentLoaded', (event) => {
    let language = window.navigator.userLanguage || window.navigator.language;
    let lang = "en-us/min";
    
    if (language.includes('es'))
        lang = "es-sv/min";
    
    let langLoc = "../js/data/translations/";
    
    getScript(`${langLoc}${lang}/seenOn.js`) .then(() => { loadSeenOn(); }).catch((e) => { console.error(e); });
});

function loadSeenOn() {
    const { seenOn } = seenOnList;

    seenOn.forEach((item, index) => {
        const active = index == 0 ? " active" : "";

        const seenOnDiv = `<div class="carousel-item col-md-3${active}">
                                <div class="panel panel-default">
                                    <div class="panel-thumbnail">
                                        <a target="_blank" href="${item.link}" class="thumb">
                                            <picture>
                                                <source
                                                    srcset="../img/events/${item.image}.webp"
                                                    type="image/webp">
                                                <source
                                                    srcset="../img/events/${item.image}.png" 
                                                    type="image/png">
                                                <img src="../img/events/${item.image}.png" alt="${item.title}" class="img-fluid mx-auto d-block">
                                            </picture>
                                        </a>
                                    </div>
                                </div>
                            </div>`;

        document.getElementById('divEvents').innerHTML += seenOnDiv;
    });
}