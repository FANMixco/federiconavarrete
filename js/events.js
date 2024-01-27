document.getElementById('eventsCarousel').addEventListener('slide.bs.carousel', function (e) {
    var relatedTarget = e.relatedTarget;
    var idx = Array.from(relatedTarget.parentNode.children).indexOf(relatedTarget);
    var itemsPerSlide = 4;
    var totalItems = document.querySelectorAll('.carousel-item').length;

    if (idx >= totalItems - (itemsPerSlide - 1)) {
        var it = itemsPerSlide - (totalItems - idx);
        for (var i = 0; i < it; i++) {
            // append slides to end
            if (e.direction === "left") {
                document.querySelector('.carousel-item').parentNode.appendChild(
                    document.querySelector('.carousel-item')
                );
            } else {
                document.querySelector('.carousel-inner').insertBefore(
                    document.querySelector('.carousel-item'),
                    document.querySelector('.carousel-inner').firstChild
                );
            }
        }
    }
});

document.querySelector(".carousel").addEventListener("touchstart", function (event) {
    var xClick = event.touches[0].pageX;

    this.addEventListener("touchmove", function (event) {
        var xMove = event.touches[0].pageX;

        if (Math.floor(xClick - xMove) > 5) {
            this.carousel('next');
        } else if (Math.floor(xClick - xMove) < -5) {
            this.carousel('prev');
        }
    });

    this.addEventListener("touchend", function () {
        this.removeEventListener("touchmove");
    });
});

$('#eventsCarousel').carousel({ 
    interval: 2000
});