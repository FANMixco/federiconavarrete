let legends = [
	{ id: 1, name: 'Sir Francis Drake, The First Pirate of The Pacific', loc: [13.173053, -88.095873] },
	{ id: 2, name: 'The Death of The Sorcerer of La Nahuaterique', loc: [14.051629, -88.149412] },
	{ id: 3, name: 'The Mulus', loc: [13.676791, -89.278570] },
	{ id: 4, name: 'The Almighty Tlaloc', loc: [14.288539, -89.516962] },
	{ id: 5, name: 'The Mysterious Woman of The Toad River', loc: [13.923071, -88.105488] },
	{ id: 6, name: 'Lake Ilopango', loc: [13.666654, -89.078916] },
	{ id: 7, name: 'The Bewitched Wagon', loc: [13.724127, -89.660282] },
	{ id: 8, name: 'The Dwarf', loc: [13.870730, -88.628353] },
	{ id: 9, name: 'The Bandari Witch', loc: [14.242402, -89.482650] },
	{ id: 10, name: 'The Weeping Woman', loc: [14.329334, -89.150234] },
	{ id: 11, name: 'The Virgin of Izalco', loc: [13.815449, -89.630321] },
	{ id: 12, name: 'The Headless Horseman', loc: [13.859607, -89.032474] },
	{ id: 13, name: 'Tenancin, Cipitio’s girlfriend', loc: [13.551432, -88.720998] },
	{ id: 14, name: 'Prince Atonal', loc: [13.662594, -89.724913] },
	{ id: 15, name: 'The Pirate Treasures of Meanguera Island', loc: [13.188535, -87.713578] },
	{ id: 16, name: 'The Black Horse', loc: [13.861566, -89.803286] },
	{ id: 17, name: 'Tangaloa “The Guardian of The Sea”', loc: [13.643763, -88.247734] },
	{ id: 18, name: 'The Cocoa', loc: [13.823555, -90.079851] },
	{ id: 19, name: 'Lake Coatepeque Snake', loc: [13.863197, -89.560600] },
	{ id: 20, name: 'The Woman of The Chinchontepec', loc: [13.596078, -88.837726] },
	{ id: 21, name: 'The Amate Flower', loc: [13.681606, -88.061913] },
	{ id: 22, name: 'Titilcíhuat “The Fire Woman”', loc: [13.894878, -89.194313] },
	{ id: 23, name: 'The Arbolarios', loc: [13.519184, -88.514311] },
	{ id: 24, name: 'Devil’s Pool and its twin', loc: [13.976580, -89.048746] },
	{ id: 25, name: 'The Frogfish', loc: [13.169074, -87.718547] },
	{ id: 26, name: 'The Eruption of The San Salvador Volcano', loc: [13.737676, -89.287691] },
	{ id: 27, name: 'The Giantess of Jocoro', loc: [13.610782, -88.028687] },
	{ id: 28, name: 'The Bewitched Rock', loc: [14.436495, -89.396787] },
	{ id: 29, name: 'The Old Church of San Dionisio', loc: [13.287302, -88.489457] },
	{ id: 30, name: 'The Cukinca Cave', loc: [13.757794, -88.067752] },
	{ id: 31, name: 'Cuicuizcatl and The Chinchontepec Underworlds', loc: [13.596231, -88.831214] }
];

function load() {
    var map = L.map('map').setView([13.8029939, -88.9053364], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 8.4,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    legends.forEach(function(obj) { 
        let marker = getMarker(obj.id);
        L.marker(obj.loc, {icon: marker}).addTo(map)
            .bindPopup(obj.name);
    });
}

function getMarker(id) {
    return L.icon({
        iconUrl: `img/markers/number_${id}.png`,
        iconSize:     [32, 37], // size of the icon
        popupAnchor:  [0, -10] // point from which the popup should open relative to the iconAnchor
    });
}

load();