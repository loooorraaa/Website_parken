# Website_parken_IM2

# IM2 Dokumentation Projektarbeit  
**von Laura Seger**

---

## Kurzbeschreibung des Projekts  
Auf dieser Website kann man seinen aktuellen Standort sehen sowie die Standorte der Parkhäuser in Basel.  
Beim Klicken auf einen Pin erhält man Informationen über das Parkhaus.  

Als kleine Spielerei sind die Parkhäuser über einen Pfad miteinander verbunden,  
und ein kleines gelbes Auto fährt seine Runden darauf.

---

## Beispiel  
Wenn man beispielsweise anhand des Standort-Icons, welches nach dem Laden der Website erscheint, sieht,  
dass man sich in der Nähe des Unispitals befindet,  
kann man auf den nächstgelegenen Pin (Parkhaus City) klicken und Informationen dazu erhalten.

---

## Parameter  

- **Name des Parkhauses**  
- **Status**: *„offen“* oder *„geschlossen“*, wird farblich durch einen grünen oder roten Kreis und einen entsprechenden Pin dargestellt  
- **Adresse** des Parkhauses  
- **Aktuell freie Plätze**  
- **Gesamtanzahl der Parkplätze**  
- **Auslastung** des Parkhauses in Prozent

---

## APIs  
- **Daten der Parkhäuser**: [data.bs.ch](https://data.bs.ch)  
- **Pfad (GeoJSON)**: *selbst gezeichnet*

---

## Learnings und Schwierigkeiten  

Meine fertige Website sieht jetzt ganz anders aus als meine ursprüngliche UX-Abgabe.  
Das liegt daran, dass die Map das Herzstück meiner Website ist –  
und die Karte, deren Screenshot ich für die UX-Abgabe verwendet habe, war leider kostenpflichtig.  

Darum habe ich mein Design komplett auf die neue, frei verfügbare Map angepasst.  

Was leider **nicht geklappt** hat: Ich wollte die Pop-ups farblich anpassen:  
- Standort: blau  
- Geöffnetes Parkhaus: grün  
- Geschlossenes Parkhaus: rot  

Auch zusammen im Coaching-Team konnten wir leider die Pop-ups nur **einheitlich** einfärben.  
Jetzt sind alle Pop-ups blau – aber ein farbiger Kreis im Parkhaus-Popup zeigt schnell an,  
ob es geöffnet ist oder nicht.

**Positiv überrascht** war ich davon, wie gut das Einzeichnen des Pfades mit GeoJSON geklappt hat.  
Ich konnte den Pfad extern mit GeoJSON zeichnen und mithilfe von ChatGPT  
die Koordinaten erfolgreich in meine Leaflet-Map integrieren.  

Einziger Nachteil: Die Pins liegen je nach Kartengröße nicht immer exakt auf dem Pfad.  
Aber im Coaching waren alle erstaunt, wie gut das insgesamt funktioniert hat.

---

## Benutzte Ressourcen und Prompts  

- Coaching-Team vor Ort  
- Thierry (Mitstudent)  
- [geojson.io](https://geojson.io)  
- [Leaflet](https://leafletjs.com) für die Map  
- ChatGPT
