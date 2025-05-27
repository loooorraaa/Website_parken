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
                <p class="auslastung">${parkhaus.auslastung}% Auslastung</p>
                <div class="circle ${parkhaus.status}"></div>
    `); 

                
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

// Standorticon

const userLocationIcon = L.icon({
    iconUrl: 'images/standorticon.svg', // Pfad zu deinem Icon
    iconSize: [50, 50],      // Größe anpassen wie gewünscht
    iconAnchor: [25, 25],    // Punkt auf dem Icon, der den Standort markiert (Mitte unten)
    popupAnchor: [0, -30]    // Wo das Popup erscheinen soll
});




// Aktuellen Standort anzeigen
map.locate({ setView: true, maxZoom: 16 });

// 📍 Wenn der Standort gefunden wurde
map.on('locationfound', function(e) {
    const radius = e.accuracy;

    // Marker für aktuellen Standort
    const userMarker = L.marker(e.latlng, { icon: userLocationIcon })
        .addTo(map)
        .bindPopup(`
            <div class="standort-popup">
                Dein Standort<br>
                <span class="genauigkeit">Genauigkeit: ${Math.round(radius)} m</span>
            </div>
        `);
    // Popup direkt anzeigen
    userMarker.openPopup();
});




// Pfade zwischen Parkhäusern: 

const route = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [7.588688541571287, 47.545936343991656],
          [7.588546191921523, 47.54598836568741],
          [7.584680060174179, 47.54725148931351],
          [7.586143531365934, 47.549082802770016],
          [7.587015036682203, 47.55072262002028],
          [7.587280958981552, 47.55072280116386],
          [7.5875318392267275, 47.55067078718636],
          [7.5872544483935656, 47.551200643535566],
          [7.586942757116276, 47.551290050766454],
          [7.5866262561461895, 47.55183368600888],
          [7.585527421115671, 47.55215814767871],
          [7.585769924665385, 47.55246225631552],
          [7.58586530838366, 47.552439546593035],
          [7.585895957856877, 47.552489156365766],
          [7.585789564544427, 47.55251380446822],
          [7.586206601643767, 47.55294913491727],
          [7.584709266819232, 47.55552141679513],
          [7.581306233126725, 47.556371160740156],
          [7.581102051105546, 47.5566237846613],
          [7.580897869084424, 47.55848397784692],
          [7.580625626389178, 47.55970110554583],
          [7.579910989313362, 47.5601374274587],
          [7.580598840772041, 47.56125195373403],
          [7.582249915356357, 47.56075549172607],
          [7.582397867797226, 47.56127309311748],
          [7.582548341237384, 47.56125544011917],
          [7.582378237215465, 47.560715081820746],
          [7.584773578581803, 47.559987698193936],
          [7.584528613577902, 47.559454492454734],
          [7.584795129107789, 47.559409389739756],
          [7.585643235484099, 47.55941793188376],
          [7.586488706565007, 47.55927926331637],
          [7.586804000853988, 47.559289299594724],
          [7.586788977853473, 47.558639972413346],
          [7.587312932993996, 47.55860275309328],
          [7.587561122270984, 47.55869580134387],
          [7.587878253013628, 47.55921686849152],
          [7.5886228208447335, 47.559561142156326],
          [7.591173655080695, 47.56086377879342],
          [7.592090390686366, 47.56118805629356],
          [7.592644770895021, 47.560548686389524],
          [7.594011094827096, 47.56093559328332],
          [7.594228596347733, 47.560752052149866],
          [7.594269953676445, 47.56077510679364],
          [7.5933983668880956, 47.561552793371874],
          [7.592844308459036, 47.562108876815614],
          [7.5923932796162035, 47.562456704259006],
          [7.591773583097108, 47.56226885140461],
          [7.591036524864251, 47.56209225157613],
          [7.590706494929918, 47.56265312558864],
          [7.590816504908048, 47.56270261418396],
          [7.591977721343426, 47.56303253695654],
          [7.594483635523829, 47.56381744288103],
          [7.594407189892536, 47.563947542501325],
          [7.594542036390635, 47.56399649026348],
          [7.594664345530219, 47.564028518487504],
          [7.594753648941918, 47.563904203081506],
          [7.5957691717644025, 47.56423133934487],
          [7.59623730636855, 47.56351154219823],
          [7.596540238555946, 47.56308420444475],
          [7.596689743806735, 47.56312783678115],
          [7.596713246138194, 47.56308988695059],
          [7.596562071353276, 47.56304512304669],
          [7.596849473167339, 47.562666731295224],
          [7.597838279475951, 47.56050728757097],
          [7.600013653352448, 47.5620965497468],
          [7.600553002248546, 47.56237557553544],
          [7.601660778541685, 47.562861703780584],
          [7.60156415431149, 47.56295205411871],
          [7.601805459260703, 47.56304990075435],
          [7.601926260584193, 47.56310372619531],
          [7.602063906090045, 47.563154963145216],
          [7.602134606066386, 47.563195776562566],
          [7.602186831528513, 47.56326137598393],
          [7.602469255248707, 47.56322554839673],
          [7.60759914706432, 47.56584123486019],
          [7.608136357767108, 47.56571068181839],
          [7.608790912634177, 47.56553131601521],
          [7.60936119411258, 47.56502782918798],
          [7.609720792115652, 47.56452718313639],
          [7.610350064965871, 47.563747896441726],
          [7.610824935872017, 47.562293848475974],
          [7.607590204995802, 47.56152216057285],
          [7.602623749509206, 47.56094889934349],
          [7.598670189549978, 47.55931727535676],
          [7.597984034515235, 47.558766039554],
          [7.594658228849767, 47.554789529846204],
          [7.594450456378183, 47.55473744717841],
          [7.593803393537115, 47.555005872682216],
          [7.593340357743102, 47.555314359996345],
          [7.592817958385808, 47.5550779867624],
          [7.592691204857857, 47.5545156326215],
          [7.592956526400741, 47.55418436607559],
          [7.592045976477294, 47.55387738386207],
          [7.592099908000279, 47.553617396055586],
          [7.593351089709074, 47.55243085021348],
          [7.5928475543438765, 47.55183112261179],
          [7.593361090055993, 47.551565996144575],
          [7.59348813257202, 47.551711236366685],
          [7.593552950182669, 47.55167273899755],
          [7.59340516603055, 47.551539747868645],
          [7.59420814549236, 47.55115077937981],
          [7.594698052397575, 47.550753182758],
          [7.594130642495713, 47.55038927431361],
          [7.593428863896179, 47.55019379195757],
          [7.591161507944321, 47.54871452729836],
          [7.592767583915844, 47.547860717328035],
          [7.592372766696741, 47.547555536158995],
          [7.59240323874306, 47.54726254515353],
          [7.592676072159861, 47.54764760052362],
          [7.59304811772779, 47.54767271273252],
          [7.592803670410063, 47.54715288814302],
          [7.593047704645301, 47.5470771256048],
          [7.593395360258597, 47.54736299465307],
          [7.593928625572914, 47.546936082950054],
          [7.5926512691218875, 47.545429307968504],
          [7.591708753682326, 47.54571392433857],
          [7.591299503556996, 47.54527025697061],
          [7.590579601418284, 47.54556534415471],
          [7.589811321284543, 47.54580600577455],
          [7.5890052225533395, 47.54585623194376],
          [7.588776387652814, 47.54590506175873],
          [7.588686644543941, 47.54593602189655]
        ]
      }
    }
  ]
};

// Route zur Karte hinzufügen
L.geoJSON(route, {
  style: {
    color: 'rgba(102, 97, 97, 1)',
    weight: 1.3,
  }
}).addTo(map);


// Autiocon auf Pfad setzten:

// Autobewergungen sind smoother:

const autoIcon = L.icon({
    iconUrl: 'images/icon_auto_gelb.svg',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
});



const routeCoords = route.features[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);

let autoMarker = L.marker(routeCoords[0], {
    icon: autoIcon,
    rotationAngle: 0,
    rotationOrigin: 'center center'
}).addTo(map);


let currentIndex = 0;
let nextIndex = 1;
let t = 0;
const speed = 0.0095; // Geschwindigkeit

function interpolatePosition(start, end, t) {
    return [
        start[0] + (end[0] - start[0]) * t,
        start[1] + (end[1] - start[1]) * t,
    ];
}

function animate() {
    const start = routeCoords[currentIndex];
    const end = routeCoords[nextIndex];

    t += speed;

    if (t >= 1) {
        // zum nächsten Segment wechseln
        t = 0;
        currentIndex = nextIndex;
        nextIndex++;
        if (nextIndex >= routeCoords.length) {
            nextIndex = 0;  // Route von vorne starten
            currentIndex = 0;
        }
    }

    const pos = interpolatePosition(start, end, t);
    autoMarker.setLatLng(pos);

    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);



// Auto während fahren drehen: 
function updateAutoRotation() {
    if (currentIndex < routeCoords.length - 1) {
        const start = routeCoords[currentIndex];
        const end = routeCoords[nextIndex];

        const dx = end[1] - start[1]; // lng
        const dy = end[0] - start[0]; // lat
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        autoMarker.setRotationAngle(angle);
    }
}
function animateWithRotation() {
    const start = routeCoords[currentIndex];
    const end = routeCoords[nextIndex];

    t += speed;

    if (t >= 1) {
        t = 0;
        currentIndex = nextIndex;
        nextIndex++;
        if (nextIndex >= routeCoords.length) {
            nextIndex = 0;
            currentIndex = 0;
        }
    }

    const pos = interpolatePosition(start, end, t);
    autoMarker.setLatLng(pos);
    
    updateAutoRotation(); // Auto-Rotation aktualisieren

    requestAnimationFrame(animateWithRotation);
}
requestAnimationFrame(animateWithRotation);





