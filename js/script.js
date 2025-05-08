// Im Broweser öffnen und schauen, ob die Konsle funktioniert, es müsste dort "Hello World" stehen
console.log("Hello World!");


async function loadData() {
    const url = 'https://data.bs.ch/api/explore/v2.1/catalog/datasets/100088/records?limit=20'; // mit korrekter API-URL ersetzen
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error(error);
        return false;
    }
}
const parkhaeuser_loaded = await loadData();
 // gibt die Daten der API oder false in der Konsole aus
// console.log(parkhaeuser_loaded); // gibt die Daten der API oder false in der Konsole aus


let all_parkhaeuser = [];
parkhaeuser_loaded.results.forEach(parkhaus => {
    all_parkhaeuser.push({
        name: parkhaus.title,
        status: parkhaus.status,
        adresse: parkhaus.address,
        freie_plaetze: parkhaus.free,
        gesamte_plaetze: parkhaus.total,
        auslastung: parkhaus.auslastung_prozent,
        laenge: parkhaus.geo_point_2d.lon,
        breite: parkhaus.geo_point_2d.lat
    });

});
console.log(all_parkhaeuser); // gibt die Daten der API oder false in der Konsole aus



// unsere Parkhaeuser ins HTML/DOM einfüllen
const parkhaeuser_container = document.querySelector('#parkhaeuser');
all_parkhaeuser.forEach(parkhaus => {
    const html = `<div class="parkhaus">
    <h2 class="parkhaus_name">${parkhaus.name}</h2>
    <p class="parkhaus_adresse">Adresse: ${parkhaus.adresse}</p>
    <p class="parkhaus_status">Status: ${parkhaus.status}</p>
    <p class="freie_plaetze">Freie Plätze: ${parkhaus.freie_plaetze}</p>
    <p class="gesamte_plaetze">Gesamte Plätze: ${parkhaus.gesamte_plaetze}</p>
    <p class="auslastung">Auslastung: ${parkhaus.auslastung}%</p>
    <p class="koordinaten">Koordinaten: ${parkhaus.breite}, ${parkhaus.laenge}</p>
</div>`;

    parkhaeuser_container.innerHTML += html;
});


// Karte initialisieren:

// Schritt 1: Karte erstellen und im <div id="map"> anzeigen
const map = L.map('map').setView([47.5596, 7.5886], 14); // Koordinaten von Basel
//                    ↑         ↑       ↑
//                  Breite    Länge   Zoomstufe (1=Fern, 18=Sehr nah)

// Schritt 2: Kartenhintergrund laden (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 18,
}).addTo(map);

