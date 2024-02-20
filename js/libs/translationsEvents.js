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
        const lang = language.includes('es') ? "es-sv/min" : language.includes('zh') ? 'zh-zh/min' : "en-us/min";

        const data = await fetchData(`../js/data/translations/${lang}/seenOn.json`);
        loadSeenOn(data);
    } catch (e) {
        console.error(e);
    }

    $('#eventsCarousel').on('slide.bs.carousel', function (e) {
        var $e = $(e.relatedTarget);
        var idx = $e.index();
        var itemsPerSlide = 4;
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
      
    $(".carousel").on("touchstart", function(event){
        var xClick = event.originalEvent.touches[0].pageX;
        $(this).one("touchmove", function(event){
            var xMove = event.originalEvent.touches[0].pageX;
            if( Math.floor(xClick - xMove) > 5 ){
                $(".carousel").carousel('next');
            }
            else if( Math.floor(xClick - xMove) < -5 ){
                $(".carousel").carousel('prev');
            }
        });
        $(".carousel").on("touchend", function(){
                $(this).off("touchmove");
        });
    });
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