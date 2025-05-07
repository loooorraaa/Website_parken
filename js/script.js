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
        adresse: parkhaus.adress,
        freie_plaetze: parkhaus.free,
        gesamte_plaetze: parkhaus.total,
        auslastung: parkhaus.auslastung_prozent,
        
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
    </div>`;
    parkhaeuser_container.innerHTML += html;
});
