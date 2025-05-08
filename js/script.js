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
// const parkhaeuser_container = document.querySelector('#parkhaeuser');
// all_parkhaeuser.forEach(parkhaus => {
//     const html = `<div class="parkhaus">
//     <h2 class="parkhaus_name">${parkhaus.name}</h2>
//     <p class="parkhaus_adresse">Adresse: ${parkhaus.adresse}</p>
//     <p class="parkhaus_status">Status: ${parkhaus.status}</p>
//     <p class="freie_plaetze">Freie Plätze: ${parkhaus.freie_plaetze}</p>
//     <p class="gesamte_plaetze">Gesamte Plätze: ${parkhaus.gesamte_plaetze}</p>
//     <p class="auslastung">Auslastung: ${parkhaus.auslastung}%</p>
//     <p class="koordinaten">Koordinaten: ${parkhaus.breite}, ${parkhaus.laenge}</p>
// </div>`;

//     parkhaeuser_container.innerHTML += html;
// });


// Karte initialisieren:

// Schritt 1: Karte erstellen und im <div id="map"> anzeigen
const map = L.map('map').setView([47.5596, 7.5886], 14); // Koordinaten von Basel
//                                  ↑         ↑       ↑
//                                Breite    Länge   Zoomstufe (1=Fern, 18=Sehr nah)

// Schritt 2: Kartenhintergrund laden (OpenStreetMap)
const humanitarianTileLayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://hot.openstreetmap.org/">Humanitarian OpenStreetMap Team</a>',
    maxZoom: 19
}).addTo(map);


// // Schritt 3: Marker für jedes Parkhaus hinzufügen
// all_parkhaeuser.forEach(parkhaus => {
//     // Überprüfen, ob sowohl lat als auch lon vorhanden sind
//     console.log('Parkhaus Koordinaten: ', parkhaus.breite, parkhaus.laenge);
//     if (parkhaus.breite && parkhaus.laenge) {
//         L.marker([parkhaus.breite, parkhaus.laenge])  // [lat, lon]
//             .addTo(map)
//             .bindPopup(`
//                 <h2>${parkhaus.name}</h2>
//                 <p class="adresse">Adresse: ${parkhaus.adresse}</p>
//                 <p class="freiePlaetze"> Freie Plätze: ${parkhaus.freie_plaetze}</P>
//                 <p class="gesamtePlaetze"> Gesamte Plätze: ${parkhaus.gesamte_plaetze}</p>
//                 <p class="auslastung"> Auslastung: ${parkhaus.auslastung}%</p>`);
//     } else {
//         console.log('Fehlende Koordinaten für Parkhaus: ', parkhaus.name);
//     }
// })


// // Standartmarker mit meinen eigenen Markern ersetzten: 
// // Benutzerdefiniertes Icon für Marker
const meinPinIcon = L.divIcon({
    className: 'custom-icon',
    html: `<img src="images/pin_grau.svg" width="30" height="30" />`, // Hier wird das benutzerdefinierte SVG geladen
    iconSize: [20, 20],  // Größe des Icons
    iconAnchor: [10, 41], // Der Punkt des Markers (Mitte des Icons)
    popupAnchor: [0, -40] // Position des Popups
});

// Marker für jedes Parkhaus hinzufügen
// all_parkhaeuser.forEach(parkhaus => {
//     if (parkhaus.breite && parkhaus.laenge) {
//         L.marker([parkhaus.breite, parkhaus.laenge], {icon: meinPinIcon})  // Setze das benutzerdefinierte Icon
//             .addTo(map)
//             .bindPopup(`
//                 <h2>${parkhaus.name}</h2>
//                 <p class="adresse">Adresse: ${parkhaus.adresse}</p>
//                 <p class="freiePlaetze"> Freie Plätze: ${parkhaus.freie_plaetze}</P>
//                 <p class="gesamtePlaetze"> Gesamte Plätze: ${parkhaus.gesamte_plaetze}</p>
//                 <p class="auslastung"> Auslastung: ${parkhaus.auslastung}%</p>`);  
            
//     }
// });


// Marker für geöffnet und geschlossen
// Marker neutral
// const defaultIcon = L.divIcon({
//     className: 'custom-icon',
//     html: `<img src="images/pin_grau.svg" width="30" height="40" />`, // Graues SVG für Standard
//     iconSize: [30, 40], // Größe des Icons
//     iconAnchor: [15, 40], // Der Punkt des Markers (Mitte des Icons)
//     popupAnchor: [0, -40] // Popup erscheint darüber
// });

// Marker geöffnet
const openIcon = L.divIcon({
    className: 'custom-icon',
    html: `<img src="images/pin_grün.svg" width="30" height="30" />`, // grünes SVG für geöffnet
    iconSize: [20, 20],
    iconAnchor: [10, 41],  
    popupAnchor: [0, -40]  
});

// Marker geschlossen
const closedIcon = L.divIcon({
    className: 'custom-icon',
    html: `<img src="images/pin_rot.svg" width="30" height="30" />`, // rotes SVG für geschlossen
    iconSize: [20, 20],
    iconAnchor: [10, 41],  
    popupAnchor: [0, -40]  
});


// Schritt 2: Marker hinzufügen und Icons basierend auf dem Status setzen
all_parkhaeuser.forEach(parkhaus => {
    if (parkhaus.breite && parkhaus.laenge) {
        // Schritt 3: Setze das graue Icon als Standard-Status
        let currentIcon = meinPinIcon;

        // // Schritt 4: Wenn das Parkhaus geöffnet ist, ändere das Icon auf grün
        // if (parkhaus.status === 'offen') {
        //     currentIcon = openIcon;
        // }
        // // Wenn das Parkhaus geschlossen ist, ändere das Icon auf rot
        // else if (parkhaus.status === 'geschlossen') {
        //     currentIcon = closedIcon;
        // }

        // Schritt 5: Marker hinzufügen
        const marker = L.marker([parkhaus.breite, parkhaus.laenge], { icon: currentIcon })
            .addTo(map)
            .bindPopup(`
                <h2>${parkhaus.name}</h2>
                <p class="status">${parkhaus.status}</p>
                <p class="adresse">${parkhaus.adresse}</p>
                <p class="freiePlaetze">${parkhaus.freie_plaetze} freie Plätze von</p>
                <p class="gesamtePlaetze">${parkhaus.gesamte_plaetze}</p>
                <p class="auslastung">${parkhaus.auslastung}%</p> Auslastung`);

                
        // Schritt 6: Klick-Event für den Marker, um das Icon zu wechseln
        marker.on('click', () => {
            

            // Überprüfen, ob das aktuelle Parkhaus geöffnet oder geschlossen ist
            if (parkhaus.status === 'offen') {
            marker.setIcon(openIcon); // Grün für geöffnet
            } else if (parkhaus.status === 'geschlossen') {
            marker.setIcon(closedIcon); // Rot für geschlossen
            }

            // Speichere den aktiven Marker
            activeMarker = marker;
        });

        // Event, um den Marker zurückzusetzen, wenn er nicht mehr im Fokus ist
        marker.on('popupclose', () => {
            marker.setIcon(meinPinIcon); // Zurücksetzen auf Standard-Icon
        });
    }
});