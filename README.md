# Website_parken_IM2

# IM2 Dokumentation Projektarbeit
### von Laura Seger
---

## Kurzbeschreibung des Projekts (max. 500 Zeichen)
Auf dieser Website kann man seinen aktuellen Standort sehen und deren der Parkhäuser in Basel. Beim Klicken auf den Pin erhält man Informationen über das Parkhaus. Als kleine Spielerei sind sie Parkhäuser über einen Pfad miteinander verbunden und ein kleines gelbes Auto fährt seine Runden darauf.

*Beispiel*
Wenn man beispielsweise anhand des Standorticons, welches immer nach dem Laden der Website aufpoppt, sieht, dass man sich in der Nähe des Unispitals befindet, kann man auf den nächstgelegenen Pin (Parkhaus City) drücken und Informationen zum Parkhaus herauslesen. 

*Parameter*
-Name des Parkhauses
-Status: «offen» oder «zu», dieses wird farblich durch einen grünen oder roten Kreis und dem farblich angepassten Pin unterstützt
-Adresse des Parkhauses
-aktuell freie Plätze des Parkhauses 
-die Gesamtanzahl der Parkplätze des Parkhauses
-Auslastung des Parkhauses in Prozent

*API's*
-Daten der Parkhäuser: data.bs.ch
-Pfad: GeoJson (selbst gezeichnet)
---

## Learnings und Schwierigkeiten (max. 200 Zeichen)
Meine fertige Website sieht jetzt ganz anders aus als meine UX-Abgabe. Das liegt daran, dass die Map das Herzstück meiner Website ist, und die, deren SS ich für die UX-Abgabe gebraucht habe kostenpflichtig ist. Darum habe ich alle Designs nun auf die neue Map abgestimmt. 
Was leider nicht geklappt hat, ist das ich den Pop-up verschiedenfarbig einfärben konnte. Ursprünglich wollte ich das Pop-up für den Standorticon blau, für ein geöffnetes Parkhaus grün und für ein geschlossenes Rot. Auch zusammen im Coaching, konnten wir leider die Pop-ups nur jeweils in eine Farbe färben. Darum haben nun alle die Grundfarbe blau und ein eingefärbter Kreis beim Parkaus-Pop-up zeigt schnell an, ob dieses geöffnet ist oder nicht.
Was mich aber umso mehr überrascht hat, ist, das Einzeichnen des Pfades mit GeoJson so gut geklappt hat. Ich konnte den Pfad extern auf GeoJson einzeichnen und dessen Koordinaten mithilfe von ChatGPT in meine Map einfügen. Leider sind die Standorte der Pins nicht immer bei jeder Grösse der Karte perfekt auf dem Pfad, aber im Coaching waren alle erstaunt, dass es so gut geklappt hatte.

---
## Benutzte Ressourcen und Prompts 
Als externe Hilfe hatte ich das Coaching-Team vor Ort. Dann Thierry, ein Mitstudent, sowie wie schon eben erwähnt GeoJson, dann auch Leaflet für die Map und auch ChatGPT.
Beispielprompt ChatGPT: (nicht mein bestes Deutsch)
ich möchte einen Pfad an diesen Punkten entlang von GeoJson in meine Leaflet Map machen.... hier ist das GeoJson: { "type": "FeatureCollection", "features": [ { "type": "Feature", "properties": {}, "geometry": { "coordinates": [ [ 7.589536720675341, 47.545461292230016 ],……..
---
