---
titel: Yapaia Go benutzen
kurz: Fahrzeug eintragen, Ziel finden, losfahren – und was die Knöpfe unterwegs tun.
reihenfolge: 2
---

## Der Einrichtungsassistent

Beim ersten Öffnen führt dich Go durch fünf Fragen:

1. **Sprache und Einheiten**
2. **Karte** – welche Region du brauchst (siehe [Karten und Kartenserver](/de/docs/handbuch/karten/))
3. **Dein Fahrzeug** – Höhe, Breite, Länge, Gewicht
4. **Position** – woher Go weiß, wo du bist
5. **Home Assistant** – passiert meist von selbst

## Dein Fahrzeug

Trag die Maße **mit Dachbox, Klimaanlage und Fahrradträger** ein – also das, was wirklich unter die Brücke passen muss. Du kannst mehrere Profile anlegen, z. B. „Camper“ und „Camper mit Anhänger“, und oben links umschalten.

![Fahrzeugprofil in Yapaia Go](/assets/bilder/go-fahrzeugprofil.png)

> Ab 2,70 m Höhe weist Go darauf hin, dass Höhenbeschränkungen auf kleinen Straßen in OpenStreetMap nicht immer erfasst sind. Augen auf bleibt Pflicht.

## Woher kommt die Position?

| Quelle | Wann sinnvoll | Einstellung |
| --- | --- | --- |
| USB-GPS-Empfänger | fest eingebaut, immer zuverlässig | Add-on-Konfiguration: `gps_source: usb` |
| Handy mit Home-Assistant-App | kein Empfänger vorhanden | `gps_source: companion_app` |
| Browser des Tablets | zum Ausprobieren | geht immer |

## Ziel finden und losfahren

1. Oben ins Suchfeld tippen: Adresse, Ort oder Stellplatz.
2. Ergebnis antippen → Route erscheint mit Ankunftszeit und Länge.
3. **Los** – Go wechselt in den Fahrmodus.

Im Fahrmodus siehst du den nächsten Abbiegehinweis, das Tempolimit, dein Tempo, Ankunft, Restzeit und Entfernung. Kommst du von der Route ab, rechnet Go von selbst neu.

![Yapaia Go im Fahrmodus](/assets/bilder/go-fahrmodus.png)

## Sicher bedienen

- Ab **10 km/h** sperren sich Suche und Einstellungen. Favoriten gehen weiter.
- Tasten sind groß genug für den Daumen bei Kopfsteinpflaster.
- Linkslenker oder Rechtslenker: Die Bedienelemente lassen sich spiegeln.
- Der Bildschirm bleibt während der Fahrt wach.

## Ziel per Sprache oder aus Home Assistant

- In Home Assistant gibt es das Feld **Ziel eingeben** beim Gerät „Yapaia Go“.
- Mit einem Sprachassistenten (z. B. [Yapaia Satellite](/de/module/satellite/)): „Fahre mich nach Magdeburg“.
- In Automationen: Aktion **Yapaia: Go Ziel setzen**.

## Probefahrt im Stehen

Unter **Einstellungen → Add-ons → Yapaia Go → Konfiguration** kannst du im Bereich *advanced* den `gps_simulator` freischalten (danach Add-on neu starten). Dann fährt ein Punkt deine Route ab – ideal, um Ansagen auszuprobieren. Danach wieder ausschalten.

## Die Gesundheitsprüfung

Das Stethoskop-Symbol rechts öffnet die **Installationsprüfung**. Sie sagt dir in Klartext, was fehlt (Karte, Routing, GPS) und was du tun kannst.
