loadBooks();

function loadBooks() {
    booksList.forEach(function(item, index) {
        const active = item.isActive ? " active" : "";

        const book = `<div class="carousel-item col-12 col-sm-6 col-md-4 col-lg-2${active}">
                    <a target="_blank" href="${item.link}">
                        <img class="img-fluid mx-auto d-block" src="${item.img}" alt="slide ${index + 1}">
                    </a>
            </div>`;

        $("#divBooks").append(book);
    });
}