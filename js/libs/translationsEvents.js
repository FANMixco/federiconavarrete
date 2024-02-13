window.addEventListener('DOMContentLoaded', (event) => {
    let language = window.navigator.userLanguage || window.navigator.language;
    let lang = "en-us/min";
    
    lang = (language.includes('es')) ? "es-sv/min": (language.includes('zh')) ? 'zh-zh/min' : lang;
    
    let langLoc = "../js/data/translations/";
    
    fetchData(`${langLoc}${lang}/seenOn.json`).then((data) => {
        loadSeenOn(data); 
    }).catch((e) => { console.error(e); });
});

function loadSeenOn(seenOnList) {
    const defTxt = 'contest-';
    const { seenOn } = seenOnList;

    seenOn.forEach((item, index) => {
        const active = index == 0 ? " active" : "";

        const seenOnDiv = `<div class="carousel-item col-md-3${active}">
                                <div class="panel panel-default">
                                    <div class="panel-thumbnail">
                                        <a target="_blank" href="https://${item.link}" class="thumb">
                                            <picture>
                                                <source
                                                    srcset="../img/events/${defTxt}${item.image}.webp"
                                                    type="image/webp">
                                                <source
                                                    srcset="../img/events/${defTxt}${item.image}.png" 
                                                    type="image/png">
                                                <img src="../img/events/${defTxt}${item.image}.png" alt="${item.title}" class="img-fluid mx-auto d-block">
                                            </picture>
                                        </a>
                                    </div>
                                </div>
                            </div>`;

        document.getElementById('divEvents').innerHTML += seenOnDiv;
    });
}