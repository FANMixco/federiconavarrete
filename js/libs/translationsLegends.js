loadLegends();

function loadLegends() {
    legendsList.forEach(item => {
        const active = item.isActive ? " active" : "";

        const legend = `<div class="carousel-item col-md-4${active}">
            <div class="card">
            <div class="img-thumbnail">
                <a class="text-warning" target="_blank" href="${item.link}">
                    <img src="${item.img}" alt="Cadejo" class="cards-row">
                    <div class="caption">
                        <p>${item.title}</p>
                    </div>
                </a>
            </div>
            </div>
        </div>`;

        $("#divLegends").append(legend);
    });
}